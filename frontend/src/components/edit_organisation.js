import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

const EditOrganisation = ({ name, sessionId, organisationId }) => {
  const [orgName, setOrgName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const navigate = useNavigate();

  const headers = {
    "Authorization": sessionId,
    "Content-Type": "application/json"
  };

  const setOrgDetails = organisations => {
    let orgData = organisations.filter(org => org.id === organisationId);
    setHourlyRate(orgData[0].hourlyRate);
    setOrgName(orgData[0].name);
  };

  const updateOrg = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/organisations/${organisationId}`, {
      name: orgName,
      hourlyRate: hourlyRate
    }, {
      headers: headers
    })
    .then(res => {
      navigate(`/view-organisation/${organisationId}`);
    })
  };

  const deleteOrg = () => {
    axios.delete("http://localhost:3000/organisations/leave", {
    }, {
      headers: headers
    })
    .then(res => {
      navigate("/view-organisations");
    })
  };

  useEffect(() => {
    axios.get("http://localhost:3000/organisations", {
      headers: headers
    })
    .then(res => {
      setOrgDetails(res.data);
    })
  });

  return (
    <div>
      <NavBar name={name} sessionId={sessionId}></NavBar>

      <h2>Edit Organisation</h2>
      <form onSubmit={updateOrg}>
        <label className="label">Name:</label>
        <input className="input" type="text" name="name" value={orgName} onChange={e => setOrgName(e.target.value)} required />
        <br/>
        <label className="label">Hourly Rate: $</label>
        <input className="input" type="number" name="hourlyRate" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} required />
        <br/><br/>
        <input type="submit" value="Update" />
        <br/>
        <Link onClick={deleteOrg()}>Delete</Link>
      </form>
    </div>
  )
}

export default EditOrganisation

