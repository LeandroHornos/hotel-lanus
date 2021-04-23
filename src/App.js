import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Rooms from "./components/Rooms";
import ReservationEditor from "./components/ReservationEditor"

function App() {
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
          <ReservationEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
