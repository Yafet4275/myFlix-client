import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";


export function ProfileView() {
  const { Username } = useParams();
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
      fetchFavorites(storedUser.Name, storedToken);
    }
  }, []);

  const fetchFavorites = async (userId, token) => {
    try {
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${userId}/favorite`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch favorite movies');
      }
      const data = await response.json();
      setFavorites(data);
      console.log('Favorite: ',data);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      // console.log('user.Name: ', user.Name);
      // console.log('favoriteId: ', favoriteId);
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${user.Name}/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove favorite movie');
      }
      setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const toggleDetails = (favoriteId) => {
    setShowDetails(prevState => ({
      ...prevState,
      [favoriteId]: !prevState[favoriteId]
    }));
  };

  return (
    <div className="movie-container">
      <h2>Welcome, {user.Name}</h2>
      <p>Email: {user.Email}</p>
      <h3>Favorite Movies</h3>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {favorites.map((favorite) => (
          <Col key={favorite._id} className="mb-5">
            <Card>
              <Card.Img className='card-img-top' variant="top" src={favorite.ImageURL} />
              <Card.Body>
                <Card.Title>{favorite.Title}</Card.Title>
                <Card.Text>Director: {favorite.Director.Name}</Card.Text>
                <Card.Text>Year: {favorite.Year}</Card.Text>
                {showDetails[favorite._id] && (
                  <>
                    <Card.Text>Rating: {favorite.Rating}</Card.Text>
                    <Card.Text>Genre: {favorite.Genre.Name}</Card.Text>
                    <Card.Text>Description: {favorite.Description}</Card.Text>
                  </>
                )}
                <Button
                  variant="link"
                  onClick={() => toggleDetails(favorite._id)}>
                  {showDetails[favorite._id] ? 'Show Less' : 'Show More'}
                </Button>
              </Card.Body>
            </Card>
            {/* <Link to={`/movies/${favorite._id}`}>Link</Link> */}
            {/* <Link to="/LoginPage"> */}
              <Button variant="secondary" onClick={() => handleRemoveFavorite(favorite._id)}>Remove</Button>
            {/* </Link> */}
          </Col>
        ))}
      </Row>
    </div>
  );
};