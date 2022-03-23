import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Signup from './components/signup';
import Organisations from './components/organisations';
import './App.css';
import Organisation from './components/organisation';

function App() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [organisationId, setOrganisationId] = useState("");
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
        <Route path="/" element={<Login saveSessionId={saveSessionId} ogranisationId={organisationId} exact/>} />
        <Route path="/signup" element={<Signup saveSessionId={saveSessionId} />} exact />
        <Route path="/view-organisations" element={<Organisations name={name} sessionId={sessionId} />} exact />
        <Route path="view-organisations/:id" element={<Organisation name={name} sessionId={sessionId} organisationId={organisationId} />} exact />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
