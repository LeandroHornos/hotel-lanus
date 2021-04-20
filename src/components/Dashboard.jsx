import React from "react";

import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <NavigationBar />
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
    </React.Fragment>
  );
};

export default Dashboard;
