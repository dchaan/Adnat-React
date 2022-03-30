import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";

const Organisations = ({ name, sessionId }) => {
  const [organisations, setOrganisations] = useState([]);
  const [organisationName, setOrganisationName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const navigate = useNavigate();

  const headers = {
    "Authorization": sessionId,
    "Content-Type": "application/json"
  };

  const joinOrg = organisationId => {
    axios.post("http://localhost:3000/organisations/join", {
      organisationId: organisationId
    }, {
      headers: headers
    })
    .then(res => {
      navigate(`/view-organisation/${organisationId}`);
    })
  };

  const createAndJoinOrg = e => {
    e.preventDefault();
    axios.post("http://localhost:3000/organisations/create_join", {
      name: organisationName,
      hourlyRate: hourlyRate
    }, {
      headers: headers
    })
    .then(res => {
      navigate(`/view-organisation/${res.data.organisationId}`);
    })
  };

  useEffect(() => {
    axios.get("http://localhost:3000/organisations", {
      headers: headers
    })
    .then(res => {
      setOrganisations(res.data);
    })
  },[])

  return (
    <div>
      <Navbar name={name} sessionId={sessionId} />

      <h2>Organisations</h2>
      <p>You aren't a member of any organisation. Join an existing one or create a new one!</p>
      <ul>
        {organisations.map((organisation, i) => (
          <li key={i}>
            {organisation.name} {" "}
            <Link to={`/edit-organisation/${organisation.id}`}>Edit</Link>
            <button onClick={() => joinOrg(organisation.id)}>Join</button>
          </li>
        ))}
      </ul>
      <br/><br/>

      <h2>Create Organisation</h2>
      <form onSubmit={createAndJoinOrg}>
        <label className="label">Name: </label>
        <input className="input" type="text" name="name" value={organisationName} onChange={e => setOrganisationName(e.target.value)} placeholder="Name" required />
        <br/>
        <label className="label">Hourly Rate: $</label>
        <input className="input" type="number" name="hourlyRate" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="0" required />
        <br/><br/>
        <input type="submit" value="Create & Join!" />
      </form>
    </div>
  );
}

export default Organisations;