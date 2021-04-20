import React from "react";

import NavigationBar from "./NavigationBar";

const Rooms = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center">Habitaciones</h1>
        </div>
        <div className="col-md-3"></div>
      </div>
    </React.Fragment>
  );
};

export default Rooms;
