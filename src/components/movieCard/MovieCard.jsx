import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import './movieCard.css'; 


export function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    // Check if the token is available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch movies only when the token is available
      fetchMovies(storedToken);
    }
  }, []);

  const fetchMovies = (token) => {
    // console.log("Token: ", token);
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Data: ", data);
        setMovies(data);
        console.log("movies: ", movies);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const toggleDetails = (movieId) => {
    setShowDetails(prevState => ({
      ...prevState,
      [movieId]: !prevState[movieId]
    }));
  };

  return (
    <div className="movie-container">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {movies.map((movie) => (
          <Col key={movie._id} className="mb-5">
            <Card>
              <Card.Img className='card-img-top' variant="top" src={movie.ImageURL} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Year: {movie.Year}</Card.Text>
                {showDetails[movie._id] && (
                  <>
                    <Card.Text>Rating: {movie.Rating}</Card.Text>
                    <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                    <Card.Text>Description: {movie.Description}</Card.Text>
                  </>
                )}
                <Button
                  variant="link"
                  onClick={() => toggleDetails(movie._id)}
                >
                  {showDetails[movie._id] ? 'Show Less' : 'Show More'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
