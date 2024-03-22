import React, { useState, useEffect } from 'react';
import { LoginView } from './components/login-view/login-view';
import { MovieCard } from './components/movieCard/MovieCard';
import { UpdateProfileForm } from './components/Profile/updateUser';
import { ProfileView } from './components/Profile/profile-view';
import { createBrowserRouter, BrowserRouter as Router, RouterProvider, useNavigate, Link } from 'react-router-dom';
import { NavigationBar } from './components/navigationBar/navigationBar';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginView />,
    },
    {
      path: '/login',
      element: <LoginView />,
    },
    {
      path: '/profile',
      element: <ProfileView />,
    },
    {
      path: '/home',
      element: <MovieCard />,
    },
    {
      path: '/updateProfile',
      element: <UpdateProfileForm />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
