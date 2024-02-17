import React, { useState, useEffect } from 'react';
import './movieCard.css';

export function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the token is available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch movies only when the token is available
      fetchMovies(storedToken);
    }
  }, []);

  const fetchMovies = (token) => {
    console.log("Token: ", token);
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Data: ", data);
        setMovies(data);
        console.log("movies: ", movies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  return (
    <div className='movie-container'>
      {movies.map(movie => (
        <div className='movie-card' key={movie._id}>
          <div className='movie-info'>
            <h2 className='movie-title'>{movie.Title}</h2>
            <p className='movie-year'>Year: {movie.Year}</p>
            <p className='movie-rating'>Rating: {movie.Rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
