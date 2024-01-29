import React, { useState } from 'react';
import MovieCard from './MovieCard';
import MovieView from './MovieView';

function MainView() {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
        ))
      )}
    </div>
  );
}

export default MainView;
