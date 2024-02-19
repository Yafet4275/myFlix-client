import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movieCard/MovieCard';
import { MovieView } from '../movie-view/MovieView';
import './MainView.css';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser: null);
  const [token, setToken] = useState(storedToken ? storedToken: null);

  if (!user) {
    return (
      <div className="container">
      <div className="login-signup-container">
        <LoginView onLoggedIn={ (user, token) => { setUser(user); setToken(token); }} />
      </div>
    </div>
  );
  } else {
    return(
      <div className='movie-container'>
        <MovieCard />
      <div className='logoutButton'>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
      </div>
  );}
}

export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
    this.setState({ interval });
  }

  // code executed just before the moment the component gets removed from the DOM.
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div className='clock-container'>
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
      </div>
    );
  }
}
