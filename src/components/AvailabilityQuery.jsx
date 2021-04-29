import React, { useState } from "react";
// React-bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Router
import { useHistory } from "react-router-dom";
// Components
import NavigationBar from "./NavigationBar";

const AvailabilityQuery = (props) => {
  const history = useHistory();

  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");

  const dateToTimestamp = (date) => {
    let myDate = new Date(date);
    return myDate.getTime();
  };

  const handleSubmit = () => {
    let query = { dateIn, dateOut, singleBeds: 1, doubleBeds: 0 };
    props.setCurrentQuery(query);
    console.log("Busqueda:", query);
    history.push("/reservation-query-results");
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Busca disponibilidad</h1>
          <Form>
            <Form.Group>
              <Form.Label>Fecha de entrada</Form.Label>
              <input
                type="date"
                className="form-control"
                aria-describedby="dateHelp"
                id="date-out"
                onChange={(e) => {
                  console.log(dateToTimestamp(e.target.value));
                  setDateIn(dateToTimestamp(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de salida</Form.Label>
              <input
                type="date"
                className="form-control"
                aria-describedby="dateHelp"
                id="date-out"
                onChange={(e) => {
                  console.log(dateToTimestamp(e.target.value));
                  setDateOut(dateToTimestamp(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cantidad de camas</Form.Label>
              <Form.Control
                type="number"
                disabled
                value={1}
                className="text-muted"
              ></Form.Control>
            </Form.Group>
            <Button
              block
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Buscar
            </Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

export default AvailabilityQuery;
