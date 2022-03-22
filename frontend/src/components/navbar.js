import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ name, sessionId }) => {
  const navigate = useNavigate();
  const logout = () => {
    axios.delete("http://localhost:3000/auth/logout", {
      headers: {
        "Authorization": sessionId,
        "Content-Type": "application/json"
      }
    })
    .then(res => { navigate("/") })
  };

  return (
    <>
      <p>
        Logged in as <b>{name}</b><br/>
        <Link onClick={() => logout()}>Logout</Link>
      </p>
    </>
  );
}

export default Navbar;