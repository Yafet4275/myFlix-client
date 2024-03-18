import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationBar } from '../navigationBar/navigationBar';
import './profile.css';


export function ProfileView() {
  const navigate = useNavigate();
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

  const userName = user ? user.Name : '';
  const userEmail = user ? user.Email : '';
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login';
  }

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
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${userName}/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove favorite movie');
      }
      fetchFavorites(userName, token);
      alert("Movie has been removed");
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
    <Container>
      <NavigationBar 
        title='MyFlix App'
        onLogout={handleLogout}/>
      <Container>
      <Row>
        <Col>
          <h3>Welcome, {userName}</h3>
          <p>Email: {userEmail}</p>
          <Link to="/updateProfile">
            <Button variant="primary">Update profile</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className='text-center'>
          <h3>Favorite Movies</h3>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {favorites.map((favorite) => (
        <Col key={favorite._id}>
          <Card className="h-100">
            <Card.Img className='card-img-top' variant="top" src={favorite.ImageURL} />
            <Card.Body>
              <div className='cardBody-container'>
              <Card.Title>{favorite.Title}</Card.Title>
              <Card.Text>Director: {favorite.Director.Name}</Card.Text>
              {showDetails[favorite._id] && (
                <>
                  <Card.Text>Year: {favorite.Year}</Card.Text>
                  <Card.Text>Rating: {favorite.Rating}</Card.Text>
                  <Card.Text>Genre: {favorite.Genre.Name}</Card.Text>
                  <Card.Text>Description: {favorite.Description}</Card.Text>
                </>
                
              )}
              </div>
              <Button
                variant="link"
                onClick={() => toggleDetails(favorite._id)}>
                {showDetails[favorite._id] ? 'Show Less' : 'Show More'}
              </Button>
            </Card.Body>
            <Card.Footer>
            <div className='card-container'>
              <Button variant="secondary" onClick={() => handleRemoveFavorite(favorite._id)}>Remove</Button>
            </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</Container>
  );
};