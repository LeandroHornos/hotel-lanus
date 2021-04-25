import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Rooms from "./components/Rooms";
import ReservationForm from "./components/ReservationForm";
import ReservationQuery from "./components/ReservationQuery";
import ReservationQueryResults from "./components/ReservationQueryResults";

function App() {
  const [currentQuery, setCurrentQuery] = useState({});
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/rooms">
          <Rooms />
        </Route>
        <Route exact path="/adminpanel">
          <AdminPanel />
        </Route>
        <Route exact path="/reserve">
          <ReservationForm />
        </Route>
        <Route exact path="/reservationquery">
          <ReservationQuery setCurrentQuery={setCurrentQuery} />
        </Route>
        <Route exact path="/reservation-query-results">
          <ReservationQueryResults currentQuery={currentQuery} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
