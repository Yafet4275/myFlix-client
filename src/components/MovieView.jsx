import React from 'react';
import '../stylesheets/MovieView.css';

function MovieView({ movie, onBack }) {
  return (
    <div>
      <h2 className="movie-view">{movie.title}</h2>
      <button className="button" onClick={onBack}>Back</button>
    </div>
  );
}

export default MovieView;