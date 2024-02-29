import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import './movieCard.css'; 


export function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check if the token is available
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedToken) {
      setToken(storedToken);
      setUsers(storedUser);
      console.log('users: ', users);
      // Fetch movies only when the token is available
      fetchMovies(storedToken);
    }
  }, []);

  const fetchMovies = (token) => {
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then((data) => {
        setMovies(data);
        console.log('movies: ',data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleAddFavorite = async (favoriteId) => {
    // /users/:Username/favorites/:MovieTitle
    console.log('user: ', users.Name);
    console.log('favoriteId: ', favoriteId);
    try {
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${users.Name}/favorites/${favoriteId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to add favorite movie');
      }
        setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== favoriteId));
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
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
                  onClick={() => toggleDetails(movie._id)}>
                  {showDetails[movie._id] ? 'Show Less' : 'Show More'}
                </Button>
              </Card.Body>
            </Card>
            <Button variant="secondary" onClick={() => handleAddFavorite(movie._id)}>Add to favorite list</Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}

