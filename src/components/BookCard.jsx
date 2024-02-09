import React from 'react';
import PropTypes from "prop-types";

export const BookCard = ({ book, onClick }) => {
  return (
    <div
      onClick={() => onClick(book)}>
      {book.title}
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};