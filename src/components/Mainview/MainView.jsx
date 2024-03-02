import React, { useState } from 'react';
import { ReactDOM } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movieCard/MovieCard';
import { Col, Row } from 'react-bootstrap';
import { NavigationBar } from '../navigationBar/navigationBar';
import { ProfileView } from '../Profile/profile-view';
import './MainView.css';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  return (
    <NavigationBar 
      title='MyFlix App'
      onLogout={() => { setUser(null); localStorage.clear(); }}
    />
  )
}



{/* <div>
  { user ? (
    <Row className="mt-0">
      <Col>
        <NavigationBar 
          title='MyFlix App'
          onLogout={() => { setUser(null); localStorage.clear(); }}
        />
      </Col>
      <Col>
        < ProfileView />
      </Col>
      <MovieCard path="/MovieCard" />
    </Row>
  ) : (
  <Row className="mt-3">
    <Col>
      <div className="container">
        <div className="login-signup-container">
          <LoginView path="/LoginPage" onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
        </div>
      </div>
    </Col>
  </Row>
  )}
</div> */}