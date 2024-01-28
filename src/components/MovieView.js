import React from 'react';

function MovieView({ movie, onBack }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default MovieView;