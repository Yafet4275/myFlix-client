import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './NavigationBar.css';

export const NavigationBar = ({ title, onLogout }) => {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark" className='mb-4'>
      <Container className="custom-navbar-container">
        <Navbar.Brand className='navbar-title mx-3'>{title}</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/profile" className="nav-link">Profiles</Link>
        </Nav>
        <Nav>
          <Button variant="light" onClick={onLogout} className="logout-btn mx-3">Logout</Button>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};
