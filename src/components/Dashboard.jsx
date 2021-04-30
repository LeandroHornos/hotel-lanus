import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";

import { HostelDataContext } from "../HostelData";

const Dashboard = () => {
  const state = useContext(HostelDataContext);
  return (
    <React.Fragment>
      <NavigationBar />
      {state.loading ? "cargando..." : <DashboardView state={state} />}
    </React.Fragment>
  );
};

const DashboardView = (props) => {
  const history = useHistory();
  const { rooms, beds } = props.state.data;
  return (
    <React.Fragment>
      {" "}
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Hotel Lanus</h1>
          <h2 className="text-center">Tu hostel amigo</h2>
          <div>
            <Button
              block
              onClick={() => {
                history.push("./adminpanel");
              }}
            >
              Admin Panel
            </Button>
            <Button
              block
              onClick={() => {
                history.push("./rooms");
              }}
            >
              Habitaciones
            </Button>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row">
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
