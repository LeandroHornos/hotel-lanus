import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        <img src="hotel-icon.png" height="18px" />
        {" "}
        Hotel Lanus
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/rooms">Rooms</Nav.Link>
        <Nav.Link href="/adminpanel">Admin</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
