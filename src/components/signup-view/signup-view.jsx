import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const FormComponent = ({ toggleForm }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // const handleRegisterClick = (event) => {
  //   event.preventDefault();
  //   setShowLogin(!showLogin);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Name: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch("http://my-flix-app-yafet-1527256b5000.herokuapp.com/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log("response: ",response);
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"/>
      </Form.Group>
      </div>
      <div className="form-outline mb-4">
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
            </Form.Group>
        </div>

      <div className="form-outline mb-4">
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
          <Form.Control 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
      </Form.Group>
      </div>

      <div className="form-outline mb-4">
      <label className="form-label" for="form1Example23">Birthday:</label>
      <input type="date" id="form1Example23" className="form-control form-control-lg" 
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required/>
      </div>
      <Button variant="primary mb-4" type="submit">Submit</Button>
      <div className="text-center">
        <p>
          Alredy have an account? {" "}
          <a href="#!" onClick={toggleForm}>Log in now</a>
        </p>
      </div>
    </form>

  </>
  );
};