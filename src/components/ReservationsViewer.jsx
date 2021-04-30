import React, { useState, useEffect, useContext } from "react";

import firebaseApp from "../firebaseApp";

import { HostelDataContext } from "../HostelData";

import Table from "react-bootstrap/Table";

import NavigationBar from "./NavigationBar";

export const timestampToDate = (timestamp) => {
  const fullDate = new Date(timestamp);
  const day = fullDate.getDay();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getObjectById = (objId, objArray) => {
  let obj = {};
  objArray.forEach((el) => {
    if (el.id === objId) {
      obj = el;
    }
  });
  return obj;
};

const ReservationsViewer = () => {
  const state = useContext(HostelDataContext);
  const db = firebaseApp.firestore();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let results = await db.collection("reservations").get();
      results = results.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setReservations(results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1 className="text-center">Reservas</h1>
          {state.loading || loading ? (
            "Cargando..."
          ) : (
            <ReservationsTable
              reservations={reservations}
              rooms={state.data.rooms}
              beds={state.data.beds}
            />
          )}
        </div>
        <div className="col-md-1"></div>
      </div>
    </React.Fragment>
  );
};

const ReservationsTable = (props) => {
  let { reservations, rooms, beds } = props;

  reservations = reservations.map((res) => {
    return {
      ...res,
      dateIn: timestampToDate(res.dateIn),
      dateOut: timestampToDate(res.dateOut),
      roomInfo: getObjectById(res.room, rooms),
      bedsInfo: res.beds.map((bedId) => {
        return getObjectById(bedId, beds);
      }),
    };
  });

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm" className="reservations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Habitacion</th>
            <th>Tipo Hab.</th>
            <th>Género Hab.</th>
            <th>Camas reservadas</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Pagado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => {
            return (
              <tr key={res.id}>
                <td>{index}</td>
                <td>Anonimo</td>
                <td>{res.roomInfo.name}</td>
                <td>{res.roomInfo.roomType}</td>
                <td>{res.roomInfo.gender}</td>
                <td>{res.beds.length}</td>
                <td>{res.dateIn}</td>
                <td>{res.dateOut}</td>
                <td>{res.payed ? "Si" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ReservationsViewer;
