import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

// React Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

import { groupAsTriplets, makeId } from "../utilities";

import { HostelDataContext } from "../HostelData";

const Rooms = () => {
  const state = useContext(HostelDataContext);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-12">
          <h1 className="text-center">Habitaciones</h1>
        </div>
        {state.loading ? (
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
            <div className="col-lg-1"></div>
            <div className="col-lg-10 col-md-12">
              <RoomsCardDeck groupedRooms={groupAsTriplets(state.data.rooms)} />
            </div>
            <div className="col-lg-1"></div>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

const RoomsCardDeck = (props) => {
  const history = useHistory();
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
                    <Card.Img
                      variant="top"
                      src={room.mainImgUrl}
                      className="room-card-img"
                    />
                    <Card.Body className="d-flex flex-column justify-content-between align-items-left">
                      <div>
                        <Card.Title className="room-card-title">
                          {room.name}
                        </Card.Title>
                        <Card.Text>{room.shortDescription}</Card.Text>
                      </div>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          history.push(`/room/${room.id}`);
                        }}
                      >
                        Ver
                      </Button>
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
