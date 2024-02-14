import React, { useState, useEffect } from 'react';
import { LoginView } from './login-view/login-view';
import { MovieCard } from './movie-card/MovieCard';
import { MovieView } from './movie-view/MovieView';
import { SignupView } from './signup-view/signup-view';
// import './MainView.css';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Movies from API:", data); // Log the received data
        console.log("Lenght: ", data.length);
        setMovies(data);
        console.log("selectedMovie: ", selectedMovie);
        console.log(selectedMovie.length);
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
  
  }, [token]);

  if (!user) {
    return (
    <div>
      <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
     <hr/>
     <hr/>
     <hr/>
      <SignupView /> 
    </div>
    );
  }

  if (!token) {
    console.log("No tokennnnnnnnnnnnnnnn");
    return;
  }
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    console.log("Empty listtttttt")
    return <div>The list is empty!</div>
  }

  return (
    <div>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
    </div>
  );
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
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>

    // <div class="clock"> 
    //   <div class="bg"> 
    //     <h2 id="h">12</h2> 
    //   </div> <h2>:</h2> 
    //   <div class="bg"> 
    //     <h2 id="m">20</h2> 
    //   </div> <h2>:</h2> 
    //   <div class="bg"> 
    //     <h2 id="s">00</h2> 
    //   </div> <div class="bg"> 
    //     <h2 id="ap">AM</h2> 
    //   </div> 
    // </div>


    );
  }
}
