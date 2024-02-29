import React from 'react';
import { LoginView } from './components/login-view/login-view';
import { MovieCard } from './components/movieCard/MovieCard';
import './App.css';
import { MainView } from './components/mainview/MainView';
import { ProfileView } from './components/Profile/profile-view';
import { NavigationBar } from './components/navigationBar/navigationBar';
import { NotFoundPage } from './components/notFound/NoFoundPage';
import "bootstrap/dist/css/bootstrap.min.css";
// import { createBrowserRouter, BrowserRouter as Router, RouterProvider } from 'react-router-dom';
// import { Container } from 'react-bootstrap';


// const router = createBrowserRouter([
//   {
//     path: '/LoginPage',
//     element: <LoginView />,
//     errorElement: <NotFoundPage />
//   },
//   {
//     path: '/Profile',
//     element: <ProfileView />,
//     errorElement: <NotFoundPage />
//   },
//   {
//     path: '/userProfile',
//     element: <ProfileView />,
//     errorElement: <NotFoundPage />
//   }
// ]);

function App() {
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      <MainView />
    </div>
  );
}

export default App;
