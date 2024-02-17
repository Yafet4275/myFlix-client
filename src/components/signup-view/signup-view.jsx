import React, { useState } from "react";
import { LoginView } from '../login-view/login-view'

export const FormComponent = ({ toggleForm }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setShowLogin(!showLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Name: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    console.log("Dataaaaaaa: ", data);
    fetch("http://my-flix-app-yafet-1527256b5000.herokuapp.com/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
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
      <input type="text" id="form1Example13" className="form-control form-control-lg"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      minLength="3"/>
      <label className="form-label" for="form1Example13">Username</label>
      </div>
      
      <div className="form-outline mb-4">
        <input type="password" id="form1Example23" className="form-control form-control-lg" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required/>
        <label className="form-label" for="form1Example23">Password</label>
      </div>

      <div className="form-outline mb-4">
      <input type="email" id="form1Example23" className="form-control form-control-lg" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
        <label className="form-label" for="form1Example23">Email</label>
      </div>

      <div className="form-outline mb-4">
      <input type="date" id="form1Example23" className="form-control form-control-lg" 
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required/>
      <label className="form-label" for="form1Example23">Birthday</label>
      </div>
      <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
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