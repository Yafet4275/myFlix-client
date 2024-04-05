import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';
import { NavigationBar } from '../navigationBar/navigationBar';
import './movieCard.css';
import { Link, useNavigate } from "react-router-dom";


export function MovieCard() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showDetails, setShowDetails] = useState({});
  const [ search, setSearch ] = useState("")
  const navigate = useNavigate();
  
  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
      fetchMovies(storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        alert("Movie has been added successfully");
      } catch (error) {
        console.error('Error adding movie:', error);
      }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  }

  const toggleDetails = (movieId) => {
    setShowDetails(prevState => ({
      ...prevState,
      [movieId]: !prevState[movieId]
    }));
  };

  //function
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  
  // filtering movies based on search text
  const filteredMovies = !search ? movies : movies.filter((movie) => movie.Title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Container className='mx-auto'>
        <NavigationBar 
          title='MyFlix App'
          onLogout={handleLogout}/>
      </Container>
      { user ? (
        <>
        <Container fluid>
          <Row className="mb-1 mx-0">
            <Col className='text-center'>
              <h3>Movie list</h3>
            </Col>  
          </Row>
          <Col className='mb-5' md={3}>
            <Form className="d-flex">
              <input value={search} onChange={searcher} type="text" placeholder='Type to search movies.....' className='form-control'/>
            </Form>
          </Col>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 mt-0">
            {filteredMovies.map((movie) => (
              <Col key={movie._id} className="mb-4">
                <Card className='h-100'>
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
                  <Card.Footer>
                    <div>
                  <Button variant="secondary" onClick={() => handleAddFavorite(movie._id)}>Add to favorite list</Button>
                  </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          </Container>
          </>
          ) : (
            <Row>
              <p>There is no user</p>
            </Row>
          )}
    </>
  );
}

