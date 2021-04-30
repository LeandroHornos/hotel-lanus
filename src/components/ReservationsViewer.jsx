import React, { useState, useEffect } from "react";

import firebaseApp from "../firebaseApp";

import Table from "react-bootstrap/Table";

import NavigationBar from "./NavigationBar";

const ReservationsViewer = () => {
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
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Reservas</h1>
          {loading ? (
            "Cargando..."
          ) : (
            <ReservationsTable reservations={reservations} />
          )}
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

const ReservationsTable = (props) => {
  const timestampToDate = (timestamp) => {
    const fullDate = new Date(timestamp);
    const day = fullDate.getDay();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let { reservations } = props;

  reservations = reservations.map((res) => {
    return {
      ...res,
      dateIn: timestampToDate(res.dateIn),
      dateOut: timestampToDate(res.dateOut),
    };
  });

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm" className="reservations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Usuario</th>
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
                <td>{res.id}</td>
                <td>Anonimo</td>
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
