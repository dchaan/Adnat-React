import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ saveSessionId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const saveSession = sessionId => { saveSessionId(sessionId); };

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", {
      email: email,
      password: password
    })
    .then(res => {
      if (res.data.sessionId) {
        saveSession(res.data.sessionId);
        axios.get("http://localhost:3000/users/me", {
          headers: {
            "Authorization": res.data.sessionId,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.data.organisationId === null) {
            navigate("/view-organisations");
          } else {
            navigate(`/view-organisations/${res.data.organisationId}`);
          }
        })
      };
    })
  };

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={login}>
        <label className="label">Email</label><br/>
        <input className="input" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required></input>
        <br/><br/>
        <label className="label">Password</label><br/>
        <input className="input" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required></input>
        <br/><br/>
        <input type="submit" value="Login"></input>
      </form>
      
      <nav>
        <Link to="/signup">Don't have an account? Signup!</Link>
      </nav>
    </>
  );
}

export default Login;