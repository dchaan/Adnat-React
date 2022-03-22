import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Signup from './components/signup';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [ogranisationId, setOrganisationId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const saveSessionId = sessionId => { setSessionId(sessionId); };

  useEffect(() => {
    axios.get("http://localhost:3000/users/me", {
      headers: {
        "Authorization": sessionId,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      setUserId(res.data.id);
      setOrganisationId(res.data.ogranisationId);
      setName(res.data.name);

    })
  });

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" render={() => (<Login saveSessionId={saveSessionId} ogranisationId={ogranisationId} />)} />
        <Route path="/signup" render={() => (<Signup saveSessionId={saveSessionId}/>)} />
    </Routes>
    </BrowserRouter>
  )

}

export default App;
