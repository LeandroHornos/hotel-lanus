import React, { useState, useEffect } from "react";

import firebaseApp from "../firebaseApp";

import Card from "react-bootstrap/Card";

import NavigationBar from "./NavigationBar";

import { groupAsTriplets } from "../utilities";

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
      return;
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Habitaciones</h1>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <RoomsCardDeck groupedRooms={groupedRooms} />
          )}
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

const RoomsCardDeck = (props) => {
  return (
    <React.Fragment>
      {props.groupedRooms.map((group) => {
        return (
          <div className="row">
            {group.map((room) => {
              return <div className="col-md-4"></div>;
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Rooms;
