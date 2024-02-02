import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import MovieCard from './MovieCard';
import MovieView from './MovieView';

export function MainView({ name }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://yafetlopez-movies-flix-d67e0436e64e.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state with the error message
      });
  }, []);

  const handleMovieClick = (movie) => {
    // Handle movie click action
  };

  return (
    <div>
      {/* Conditional rendering based on whether there's an error */}
      {error ? (
        <div>
          <h1>Error fetching data</h1>
          <p>{error}</p>
        </div>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
        ))
      )}
    </div>
  );
}

// Define PropTypes for the name prop
MainView.propTypes = {
  name: PropTypes.string.isRequired,
};
