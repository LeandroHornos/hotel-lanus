import React, { useState, useEffect } from "react";

import firebaseApp from "../firebaseApp";

// React Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import NavigationBar from "./NavigationBar";

import { groupAsTriplets, makeId } from "../utilities";

const Rooms = () => {
  const db = firebaseApp.firestore();
  const ref = db.collection("rooms");
  const [loading, setLoading] = useState(true);
  const [groupedRooms, setGroupedRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ref.get();
      const rooms = results.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log("Rooms:", rooms);
      const triplets = groupAsTriplets(rooms);
      console.log("grouped rooms:", triplets);
      setGroupedRooms(triplets);
      setLoading(false);
      return;
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Habitaciones</h1>
        </div>
        {loading ? (
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center">
                <p>
                  Cargando{" "}
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <RoomsCardDeck groupedRooms={groupedRooms} />
            </div>
            <div className="col-md-1"></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const RoomsCardDeck = (props) => {
  return (
    <React.Fragment>
      {props.groupedRooms.map((group) => {
        return (
          <div className="row" key={makeId(6)}>
            {group.map((room) => {
              return (
                <div
                  className="col-md-4"
                  key={makeId(6)}
                  style={{ padding: "10px" }}
                >
                  <Card style={{ height: "100%" }} className="room-card">
                    <Card.Img variant="top" src={room.mainImgUrl} />
                    <Card.Body>
                      <Card.Title>{room.name}</Card.Title>
                      <Card.Text>{room.shortDescription}</Card.Text>
                      <Button variant="primary">Ver</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Rooms;
