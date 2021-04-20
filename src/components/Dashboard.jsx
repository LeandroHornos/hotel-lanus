import React from "react";

import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  const history = useHistory();
  return (
    <div>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <h1>Hotel Lanus</h1>
            <h2>Tu hostel amigo</h2>
          <div>
          <Button
              onClick={() => {
                history.push("./adminpanel");
              }}
            >
              Admin Panel
            </Button>
            <Button
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
    </div>
  );
};

export default Dashboard;
