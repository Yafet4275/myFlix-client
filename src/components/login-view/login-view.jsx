import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log the data before sending the request
    console.log("Submitting login request with data:", { username, password });
    const data = {
      Name: username,
      Password: password
    };
    console.log("Data sent to server:", data); // Log the data before sending the request
    fetch("https://my-flix-app-yafet-1527256b5000.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
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

  // return (
  //   <div className="container mt-5">
  //     <h2>Login</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <label htmlFor="username">Username:</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary">Submit</button>
  //     </form>
  //   </div>
  // );


return (
  <section class="vh-100">
    <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image"></img>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <form onSubmit={handleSubmit}>
      <div class="form-outline mb-4">
        <input type="text" id="form1Example13" class="form-control form-control-lg" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required/>
        <label class="form-label" for="form1Example13">Username</label>
      </div>

      <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
            <label class="form-label" for="form1Example23">Password</label>
          </div>
      
      <div class="d-flex justify-content-around align-items-center mb-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="form1Example3"/>
          <label class="form-check-label" for="form1Example3"> Remember me </label>
        </div>
          <a href="#!">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
        <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>
      </form>
      </div>
    </div>
    </div>
  </section>
);
};