import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        Hostel Lanus
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/adminpanel">Admin</Nav.Link>
          <Nav.Link href="/adminpanel/reserve">Reservar</Nav.Link>
          <Nav.Link href="/adminpanel/reservations">Ver Reservas</Nav.Link>
          <Nav.Link href="/reservationquery">Disponibilidad</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

// <Nav className="mr-auto">
// <Nav.Link href="/">Home</Nav.Link>
// <Nav.Link href="/rooms">Rooms</Nav.Link>
// <Nav.Link href="/adminpanel">Admin</Nav.Link>
// <Nav.Link href="/reserve">Reservar</Nav.Link>
// <Nav.Link href="/reservations">Ver Reservas</Nav.Link>
// <Nav.Link href="/reservationquery">Disponibilidad</Nav.Link>
// </Nav>

export default NavigationBar;
