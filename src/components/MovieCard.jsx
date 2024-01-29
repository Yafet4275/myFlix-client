import React from 'react';
import '../stylesheets/MovieCard.css';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <h2>{movie.title}</h2>
    </div>
  );
}

export default MovieCard;