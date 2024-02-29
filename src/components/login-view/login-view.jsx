import React, { useState } from "react";
import { FormComponent } from '../signup-view/signup-view';
import { Button, Form } from "react-bootstrap/";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setShowSignup(true);
    console.log("SignUp: ", showSignup);
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log the data before sending the request
    // console.log("Submitting login request with data:", { username, password });
    const data = {
      Name: username,
      Password: password
    };
    // console.log("Data sent to server:", data); // Log the data before sending the request
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((e) => {
        console.error("Error during login:", e);
        alert("Something went wrong");
      });
  };

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"></img>
        </div>
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        {showSignup ? (
          <FormComponent toggleForm={() => setShowSignup(false)} />
        ) : (
          <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3" />
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
          
          <div className="d-flex justify-content-around align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="form1Example3"/>
              {" "}Remember me{" "}
                  </div>
                  <a href="#!" onClick={handleRegisterClick}>Forgot password?</a>
                </div>
                <Button variant="primary mb-4" type="submit">Submit</Button>
                <div className="text-center">
                  <p>
                    Not a member? {" "}
                    <a href="#!" onClick={toggleForm}>Sign up now</a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};