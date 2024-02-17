import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movieCard/MovieCard';
import { MovieView } from '../movie-view/MovieView';
// import { SignupView } from '../signup-view/signup-view';
import './MainView.css';
import { FormComponent } from '../signup-view/signup-view';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  if (!user) {
    return (
      <div className="container">
      <div className="login-signup-container">
        <LoginView onLoggedIn={ (user, token) => { setUser(user); setToken(token); }} />
        {/* <FormComponent /> */}
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
