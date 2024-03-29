import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { NavigationBar } from '../navigationBar/navigationBar';
import './movieCard.css';
import { useNavigate } from "react-router-dom";


export function MovieCard() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showDetails, setShowDetails] = useState({});
  // const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the token is available
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
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
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleAddFavorite = async (favoriteId) => {
    console.log('user: ', user.Name);
    console.log('favoriteId: ', favoriteId);
    
    try {
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${user.Name}/favorites/${favoriteId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to add favorite movie');
      }
        // setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== favoriteId));
        alert("Movie has been added successfully");
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
    <>
      <NavigationBar 
        title='MyFlix App'
        onLogout={() => { setUser(null); localStorage.clear(); 
          navigate("/login");
        }}/>
      { user ? (
      <Row className="mt-0">
      <div className="movie-container">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {movies.map((movie) => (
            <Col key={movie._id} className="mb-5">
              <div className='card-container'>
              <Card>
                <Card.Img className='card-img-top' variant="top" src={movie.ImageURL} />
                <Card.Body>
                  <div className='cardBody-container'>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>Director: {movie.Director.Name}</Card.Text>
                  {showDetails[movie._id] && (
                    <>
                      <Card.Text>Year: {movie.Year}</Card.Text>
                      <Card.Text>Rating: {movie.Rating}</Card.Text>
                      <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                      <Card.Text>Description: {movie.Description}</Card.Text>
                    </>
                  )}
                  </div>
                  <Button
                    variant="link"
                    onClick={() => toggleDetails(movie._id)}>
                    {showDetails[movie._id] ? 'Show Less' : 'Show More'}
                  </Button>
                </Card.Body>
              </Card>
              <Button variant="secondary" onClick={() => handleAddFavorite(movie._id)}>Add to favorite list</Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      </Row>
      ) : (
        <div>There is no movies</div>
        )} 
    </>
  );
}

