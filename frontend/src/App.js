import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Signup from './components/signup';
import Organisations from './components/organisations';
import './App.css';
import Organisation from './components/organisation';
import EditOrganisation from './components/edit_organisation';
import Shifts from './components/shifts';

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
      setOrganisationId(res.data.organisationId);
      setName(res.data.name);
    })
  });

  return (
    <BrowserRouter>
      <h1><Link to="/">Adnat</Link></h1>
      <Routes>
        <Route path="/" element={<Login saveSessionId={saveSessionId} ogranisationId={organisationId} exact/>} />
        <Route path="/signup" element={<Signup saveSessionId={saveSessionId} />} exact />
        <Route path="/view-organisations" element={<Organisations name={name} sessionId={sessionId} />} exact />
        <Route path="/view-organisation/:id" element={<Organisation name={name} sessionId={sessionId} organisationId={organisationId} />} exact />
        <Route path="/edit-organsation/:id" element={<EditOrganisation name={name} sessionId={sessionId} organisationId={organisationId} />} exact />
        <Route path="/view-shifts/:id" element={<Shifts name={name} sessionId={sessionId} organsationId={organisationId} userId={userId} />} exact />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
