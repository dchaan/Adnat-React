import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ saveSessionId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const saveSession = sessionId => { saveSessionId(sessionId); };

  const signup = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/signup', {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    })
    .then(res => {
      if (res.data.sessionId) {
        saveSession(res.data.sessionId);
        navigate('/view-organisations');
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={signup}>
        <label className="label">Name</label><br/>
        <input className="input" type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <br/><br/>
        <label className="label">Email</label><br/>
        <input className="input" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <br/><br/>
        <label className="label">Password</label><br/>
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="6 characters minimum" required />
        <br/><br/>
        <label className="label">Confirm Password</label><br/>
        <input className="input" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Re-Enter password" required />
        <br/><br/>
        <input type="submit" value="Signup" />
      </form>

      <nav>
        <Link to="/">Login</Link>
      </nav>
    </div>
  )
}

export default Signup;