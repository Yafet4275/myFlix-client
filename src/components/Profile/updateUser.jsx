import React, { useState, useEffect } from "react";
import { Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../navigationBar/navigationBar';


export const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("user");
  const [token, setToken] = useState(null);
  const [formData, setFormdata] = useState({
    Name: user.Name || "",
    Email: user.Email || "",
    Birthday: user.Birthday || "",
    Password: user.Password || "",
    Country: user.Country || ""
  })

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedUser) {
      setUser(storedUser);
      console.log("User: ",user);
      setToken(storedToken);
      setFormdata({
        Name: storedUser.Name || "",
        Email: storedUser.Email || "",
        Birthday: storedUser.Birthday || "",
        Password: "",
        Country: storedUser.Country || ""
      });
    }
  }, []);
  
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${user.Name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      // Update user data in local storage
      localStorage.setItem('user', JSON.stringify(formData));
      // Update user state with the new data
      setUser(formData);
      alert('Profile updated successfully');
      navigate("/profile");
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        const response = await fetch(`https://my-flix-app-yafet-1527256b5000.herokuapp.com/users/${user.Name}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  return (
    <>
      <NavigationBar 
        title='MyFlix App'
        onLogout={handleLogout} />
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="Email" value={formData.Email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" name="Birthday" value={formData.Birthday} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="Password" value={formData.Password} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" name="Country" value={formData.Country} onChange={handleChange} required />
      </Form.Group>
      <Row>
        <Button className="mt-4" variant="primary" type="submit">Update Profile</Button>
      </Row>
      <Row>
        <Button className="mt-4" variant='danger' onClick={handleDeleteProfile}>Delete profile</Button>
      </Row>
      </Form>
    </>
  );
};
