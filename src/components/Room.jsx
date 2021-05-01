import React, { useContext } from "react";

// React Bootstrap
import Spinner from "react-bootstrap/Spinner";
// Router
import { useParams } from "react-router-dom";
// Components
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
// Functions
import { getObjectById } from "./ReservationsViewer";
// Context
import { HostelDataContext } from "../HostelData";

export const Room = () => {
  const { id } = useParams();
  const state = useContext(HostelDataContext);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8" style={{ minHeight: "100vh" }}>
          {state.loading ? (
            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center align-items-center"
            >
              Cargando{" "}
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          ) : (
            <RoomView room={getObjectById(id, state.data.rooms)} />
          )}
        </div>
        <div className="col-md-2"></div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const RoomView = (props) => {
  const { room } = props;
  return (
    <React.Fragment>
      <div className="room-view">
        <h2 className="text-center">{room.name}</h2>
        <img
          src={room.mainImgUrl}
          alt="imagen de la habitacion"
          style={{ width: "100%" }}
        />
      </div>
    </React.Fragment>
  );
};

export default Room;
