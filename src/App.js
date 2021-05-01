import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useContext } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Rooms from "./components/Rooms";
import ReservationForm from "./components/ReservationForm";
import AvailabilityQuery from "./components/AvailabilityQuery";
import AvailabilityQueryResults from "./components/AvailabilityQueryResults";
import ReservationsViewer from "./components/ReservationsViewer";
import LandingPage from "./components/LandingPage";

import { HostelDataProvider } from "./HostelData";

function App() {
  const [currentQuery, setCurrentQuery] = useState({});
  return (
    <HostelDataProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
          <Route exact path="/adminpanel">
            <AdminPanel />
          </Route>
          <Route exact path="/adminpanel/reservations">
            <ReservationsViewer />
          </Route>
          <Route exact path="/adminpanel/reserve">
            <ReservationForm />
          </Route>
          <Route exact path="/reservationquery">
            <AvailabilityQuery setCurrentQuery={setCurrentQuery} />
          </Route>
          <Route exact path="/reservation-query-results">
            <AvailabilityQueryResults currentQuery={currentQuery} />
          </Route>
        </Switch>
      </Router>
    </HostelDataProvider>
  );
}

export default App;
