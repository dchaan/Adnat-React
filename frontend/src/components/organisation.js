import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";

const Organisation = ({ name, sessionId, organisationId}) => {
  const navigate = useNavigate();
  const [organisations, setOrganisations] = useState("");

  const headers = {
    "Authorization": sessionId,
    "Content-Type": "application/json"
  };

  useEffect(() => {
    axios.get("http://localhost:3000/organisations", {
      headers: headers
    })
    .then(res => {
      setOrganisations(res.data);
    })
  });

  const leaveOrg = () => {
    axios.post("http://localhost:3000/organisations/leave", {
    }, {
      headers: headers
    })
    .then(res => {
      navigate("/view-organisations");
    })
  };

  return(
    <div>
      <Navbar name={name} sessionId={sessionId}></Navbar>

      {organisations.filter(organisation => organisation.id === organisationId)
        .map(filteredName => (
          <h2>{filteredName}</h2>
        ))}

      <Link to={`view-shifts/${organisationId}`}>View Shifts</Link>
      <Link to={`/edit-organisation/${organisationId}`}>Edit</Link>
      <Link onClick={leaveOrg()}>Leave</Link>
    </div>
  )
}

export default Organisation;