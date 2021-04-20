import React from "react";

import NavigationBar from "./NavigationBar";

const AdminPanel = () => {
  return (
    <div>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1>Admin Panel</h1>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default AdminPanel;
