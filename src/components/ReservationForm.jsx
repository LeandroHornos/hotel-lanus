import React, { useState, useEffect } from "react";

//Firebase
import firebaseApp from "../firebaseApp";
// Router
import { useHistory } from "react-router-dom";
//React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//Components
import NavigationBar from "./NavigationBar";

const ReservationForm = () => {
  //Firebase
  const db = firebaseApp.firestore();
  // Router
  const history = useHistory();
  // State
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [loading, setLoading] = useState(true);

  const dateToTimestamp = (date) => {
    let myDate = new Date(date);
    return myDate.getTime();
  };

  function compare(a, b) {
    if (a.customId < b.customId) {
      return -1;
    }
    if (a.customId > b.customId) {
      return 1;
    }
    return 0;
  }

  const handleSubmit = async () => {
    let reservation = {
      room: selectedRoom,
      bed: selectedBed,
      dateIn,
      dateOut,
      userId: "",
      payed: false,
      paymentId: "",
      reservationDate: new Date(),
    };
    try {
      await db.collection("reservations").add(reservation);
      console.log("Se ha creado una reserva", reservation);
      history.push("/");
    } catch (error) {
      console.log("Ha ocurrido un error al guardar la reserva", error);
    }
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
    // eslint-disable-next-line
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
                  <option value="">Selecciona una habitación</option>
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
                    console.log("cama seleccionada", e.target.value);
                  }}
                >
                  <option value="">Selecciona la cama</option>
                  {beds.sort(compare).map((bed) => {
                    return (
                      selectedRoom === bed.roomId && (
                        <option key={bed.id} value={bed.id}>
                          {`ID: ${bed.customId} | Tipo: ${bed.type}`}
                        </option>
                      )
                    );
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
                onClick={(e) => {
                  e.preventDefault();
                  console.log("reservando...");
                  handleSubmit();
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

export default ReservationForm;
