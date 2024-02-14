import React from 'react';
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie)}>
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  Movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};