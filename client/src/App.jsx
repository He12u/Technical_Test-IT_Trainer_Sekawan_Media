import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function handleLeave(event) {
    event.preventDefault();
    navigate("/booking");
  }

  function handleCreate() {
    navigate("/approval");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/booking">
                Booking Form
              </Nav.Link>
              <Nav.Link as={Link} to="/approval">
                Approval
              </Nav.Link>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
