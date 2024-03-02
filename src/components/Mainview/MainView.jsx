import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movieCard/MovieCard';
import { Card, Button, Col, Row } from 'react-bootstrap';
import NavigationBar from '../navigationBar/navigationBar';
import './MainView.css';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  return (
    <div>
      { user ? (
        <Row className="mt-0">
        <Col>
          <NavigationBar 
            title='MyFlix App'
            onLogout={() => { setUser(null); localStorage.clear(); }}
          />
        </Col>
        <MovieCard />
      </Row>
      ) : (
        <Row className="mt-3">
        <Col>
          <div className="container">
            <div className="login-signup-container">
              <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
            </div>
          </div>
        </Col>
      </Row>
      )
    }
    </div>
  );
}
