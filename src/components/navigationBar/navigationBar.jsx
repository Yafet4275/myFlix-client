import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './NavigationBar.css';

export const NavigationBar = ({ title, onLogout }) => {

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container fluid>
          <Navbar.Brand className="navbar-title mx-3">{title}</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link link-custom">
              Home
            </Link>
            <Link to="/profile" className="nav-link link-custom">
              Profiles
            </Link>
          </Nav>
          <Nav>
            <Button
              variant="light"
              onClick={onLogout}
              className="logout-btn mx-3">Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
