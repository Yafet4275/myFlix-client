import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = ({ title, onLogout }) => {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container className="custom-navbar-container">
        <Navbar.Brand className='navbar-title'>{title}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="light" onClick={onLogout} className="logout-btn">Logout</Button>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};

export default NavigationBar;
