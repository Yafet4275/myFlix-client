import React from 'react';
import '../stylesheets/MovieView.css';

function MovieView({ movie }) {
  // Function to handle 'Back' button click
  const handleBackClick = () => {
    // Execute any necessary actions, such as navigating back to the main view
    // For now, let's just log a message to the console
    console.log("Clicked 'Back' button");
  };

  return (
    <div>
      <h2 className="movie-view">{movie.title}</h2>
      <button className="button" onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default MovieView;
