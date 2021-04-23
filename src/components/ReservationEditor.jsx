import React, { useState, useEffect } from "react";

//Firebase
import firebaseApp from "../firebaseApp";

//React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//Components
import NavigationBar from "./NavigationBar";

const ReservationEditor = () => {
  //Firebase
  const db = firebaseApp.firestore();
  // State
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(
    rooms.length > 0 ? rooms[0].id : ""
  );
  const [selectedBed, setSelectedBed] = useState({});
  const [loading, setLoading] = useState(true);

  const dateToTimestamp = (date) => {
    let myDate = new Date(date);
    return myDate.getTime();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let roomData = await db.collection("rooms").get();
        let bedData = await db.collection("beds").get();
        roomData = roomData.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        bedData = bedData.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setRooms(roomData);
        setBeds(bedData);
        console.log("rooms", roomData);
        console.log("beds", bedData);
        setLoading(false);
      } catch (error) {
        console.log(
          "Ha ocurrido un error al tratar de conectarse a la base de datos",
          error
        );
      }
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Crea una reserva</h1>
          <h3 className="text-center">Demo</h3>
          {loading ? (
            <p className="text-center">Cargando...</p>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>Habitación</Form.Label>
                <Form.Control
                  value={selectedRoom}
                  as="select"
                  onChange={(e) => {
                    setSelectedRoom(e.target.value);
                  }}
                >
                  {rooms.map((room) => {
                    return (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Cama</Form.Label>
                <Form.Control
                  value={selectedBed}
                  as="select"
                  onChange={(e) => {
                    setSelectedBed(e.target.value);
                  }}
                >
                  {beds.map((bed) => {
                    if (selectedRoom === bed.roomId) {
                      return (
                        <option key={bed.id} value={bed.id}>
                          {bed.type}
                        </option>
                      );
                    } else {
                      return;
                    }
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de entrada:</Form.Label>
                <input
                  type="date"
                  className="form-control"
                  aria-describedby="dateHelp"
                  id="date-in"
                  onChange={(e) => {
                    setDateIn(dateToTimestamp(e.target.value));
                    console.log(
                      "Fecha de entrada: ",
                      dateToTimestamp(e.target.value)
                    );
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de salida:</Form.Label>
                <input
                  type="date"
                  className="form-control"
                  aria-describedby="dateHelp"
                  id="date-out"
                  onChange={(e) => {
                    setDateOut(dateToTimestamp(e.target.value));
                    console.log(
                      "Fecha de salida",
                      dateToTimestamp(e.target.value)
                    );
                  }}
                />
              </Form.Group>
              <Button
                block
                as="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("reservando...");
                }}
              >
                Reservar
              </Button>
            </Form>
          )}
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

export default ReservationEditor;
