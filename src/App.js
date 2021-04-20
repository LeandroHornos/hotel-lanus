import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import Rooms from "./components/Rooms";

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
      </Switch>
    </Router>
  );
}

export default App;
