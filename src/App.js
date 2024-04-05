import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginView } from './components/login-view/login-view';
import { MovieCard } from './components/movieCard/MovieCard';
import { UpdateProfileForm } from './components/Profile/updateUser';
import { ProfileView } from './components/Profile/profile-view';
import { NotFoundPage } from './components/notFound/NoFoundPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/home" element={<MovieCard />} />
          <Route path="/updateProfile" element={<UpdateProfileForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

