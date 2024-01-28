import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{movie.title}</h2>
    </div>
  );
}

export default MovieCard;