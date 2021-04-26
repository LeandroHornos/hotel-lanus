import React, { useState, useEffect } from "react";

// Firebase
import firebaseApp from "../firebaseApp";
import firebase from "firebase";

//React Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Components
import NavigationBar from "./NavigationBar";

const ReservationQueryResults = (props) => {
  const db = firebaseApp.firestore();

  const [beds, setBeds] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { dateIn, dateOut } = props.currentQuery;
      console.log("obteniendo resultados entre fechas", dateIn, dateOut);
      try {
        // Obtengo las reservas existentes dentro de la fecha buscada
        let reservations = await db
          .collection("reservations")
          .where("dateIn", ">=", dateIn)
          .where("dateIn", "<=", dateOut)
          .get();
        reservations = reservations.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("reservas en esas fechas", reservations);

        // Obtengo las camas correspondientes a las reservas
        const reservedBeds = reservations.map((res) => {
          return res.bed;
        });
        console.log("camas reservadas", reservedBeds);

        // Obtengo las camas disponibles
        let availableBeds;
        if (reservedBeds.length === 0) {
          availableBeds = await db.collection("beds").get();
        } else {
          availableBeds = await db
            .collection("beds")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "not-in",
              reservedBeds
            )
            .get();
        }
        availableBeds = availableBeds.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("Camas disponibles", availableBeds);
        const availableRoomsIds = availableBeds.map((bed) => {
          return bed.roomId;
        });
        console.log("camas disponibles", availableBeds);

        // Obtengo las habitaciones de las camas disponibles
        let availableRooms = await db
          .collection("rooms")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            availableRoomsIds
          )
          .get();
        availableRooms = availableRooms.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("Habitaciones disponibles", availableRooms);

        // Cargo los resultados en el state:
        setBeds(availableBeds);
        setRooms(availableRooms);
        setLoading(false);
      } catch (error) {
        console.log("ha ocurrido un error al buscar disponibilidad", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Camas disponibles</h1>
          {loading ? (
            "Cargando..."
          ) : (
            <ResultsViewer beds={beds} rooms={rooms} />
          )}
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

const ResultsViewer = (props) => {
  const { beds, rooms } = props;

  const groupBedsByType = (beds) => {
    let groupedBeds = [];
    let types = beds.map((bed) => bed.type);
    types = [...new Set(types)];
    types.forEach((type) => {
      let bedsByType = [];
      beds.forEach((bed) => {
        if (bed.type === type) {
          bedsByType.push(bed);
        }
      });
      groupedBeds.push({ type, beds: bedsByType });
    });
    return groupedBeds;
  };

  const groupBedsByRoom = (beds, rooms) => {
    let updatedRooms = [];

    rooms.forEach((room) => {
      let roomBeds = [];
      beds.forEach((bed) => {
        if (bed.roomId === room.id) {
          roomBeds.push(bed);
        }
      });
      updatedRooms.push({ ...room, availableBeds: groupBedsByType(roomBeds) });
    });
    console.log("se han agrupado las camas en casa habitacion", updatedRooms);
    return updatedRooms;
  };
  return (
    <React.Fragment>
      {groupBedsByRoom(beds, rooms).map((room) => {
        return (
          <Card className="room-query-card">
            <Card.Header>
              <Card.Title>{room.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>{room.shortDescription}</Card.Text>
              <Card.Text>Camas disponibles: </Card.Text>
              <Card.Text>
                {
                  <ul>
                    {room.availableBeds.map((group) => {
                      return (
                        <li key={group.type}>
                          {group.type}
                          {": "}
                          {group.beds.length}
                        </li>
                      );
                    })}
                  </ul>
                }
              </Card.Text>
              <Button variant="primary">Reservar</Button>
            </Card.Body>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default ReservationQueryResults;
