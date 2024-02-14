import React from 'react';

export function MovieView({ movie, onBack }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
