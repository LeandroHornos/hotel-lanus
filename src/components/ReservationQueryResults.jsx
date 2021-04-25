import React, { useState, useEffect } from "react";

import firebaseApp from "../firebaseApp";
import firebase from "firebase";

//Components
import NavigationBar from "./NavigationBar";

const ReservationQueryResults = (props) => {
  const db = firebaseApp.firestore();

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
        let availableBeds = await db
          .collection("beds")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "not-in",
            reservedBeds
          )
          .get();
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
          <h1>Camas disponibles</h1>
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

export default ReservationQueryResults;
