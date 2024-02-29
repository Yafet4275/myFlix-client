import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './NavigationBar.css';

export const NavigationBar = ({ title, onLogout }) => {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container className="custom-navbar-container">
        <Navbar.Brand className='navbar-title mx-3'>{title}</Navbar.Brand>
        <Nav className="me-auto">
          <Link><Nav.Link href="movies">Movies</Nav.Link></Link>
          <Link><Nav.Link href="profiles">Profiles</Nav.Link></Link>
        </Nav>
        <Nav>
          <Button variant="light" onClick={onLogout} className="logout-btn mx-3">Logout</Button>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};

