import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import moment from 'moment';

const Shifts = ({ name, sessionId, organsationId, userId }) => {
  const [orgName, setOrgName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [shifts, setShifts] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [shiftDate, setShiftDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [breakLength, setBreakLength] = useState("");

  const headers = {
    "Authorization": sessionId,
    "Content-Type": "application/json"
  };

  const getHoursWorked = (start, finish, breakHrs) => {
    let formattedBreak = breakHrs/60;
    let formattedStart = moment(start);
    let formattedFinish = moment(finish);
    let difference = moment.duration(formattedFinish.diff(formattedStart));
    let totalHours = difference.asHours();
    return (totalHours - formattedBreak).toFixed(2);
  }

  const getName = (userDetails, userId) => {
    let user = userDetails.filter(user => user.id === userId);
    return user[0].name;
  };

  const getShifts = () => {
    return shifts.localeCompare(shift => {
      const { id, userId, start, finish, breakLength } = shift;
      return (
        <tr key={id}>
          <td>{getName(userDetails, userId)}</td>
          <td>{moment(start).format("MM/DD/YYY")}</td>
          <td>{moment(start).format("hh:mm a")}</td>
          <td>{moment(finish).format("hh:mm a")}</td>
          <td>{breakLength}</td>
          <td>{getHoursWorked(start, finish, breakLength)}</td>
          <td>{getHoursWorked(start, finish, breakLength) * hourlyRate}</td>
        </tr>
      )
    })
  };

  const getOrgDetails = orgs => {
    let orgData = orgs.filter(org => org.id === organsationId);
    setHourlyRate(orgData[0].hourlyRate);
    setOrgName(orgData[0].name);
  };

  const createShift = e => {
    e.preventDefault();
    axios.post("http://localhost:3000/shifts", {
      userId: userId,
      start: (`${shiftDate} ${startTime}`),
      finish: (`${shiftDate} ${finishTime}`),
      breakLength: breakLength
    }, {
      headers: headers
    })
    .then(res => {
      axios.get("http://localhost:3000/shifts", {
        headers: headers
      })
      .then(res => {
        setShifts(res.data);
        setShiftDate("");
        setStartTime("");
        setFinishTime("");
        setBreakLength("");
      })
    }, [])
  };

  useEffect(() => {
    axios.get("http://localhost:3000/users", {
      headers: headers
    })
    .then(res => {
      setUserDetails(res.data);
    })
    axios.get("http://localhost:3000/shifts", {
      headers: headers
    })
    .then(res => {
      setShifts(res.data);
    })
    axios.get("http://localhost:3000/organisations", {
      headers: headers
    })
    .then(res => {
      getOrgDetails(res.data);
    })
  });

  return (
    <div>
      <Navbar name={name} sessionId={sessionId}></Navbar>

      <h2>{orgName}</h2>
      <h3>Shifts</h3>

      <form onSubmit={createShift}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>                          
              <th>Shift Date</th>
              <th>Start Time</th>
              <th>Finish Time</th>
              <th>Break Length (min)</th>
              <th>Hours Worked</th>
              <th>Shift Cost</th>
            </tr>
            {getShifts()}
            <tr>
              <td>{name}</td>
                <td><input className="input" type="date" name="shiftDate" value={shiftDate} onChange={e => setShiftDate(e.target.value)} required /></td>
                <td><input className="input" type="time" name="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} required /></td>
                <td><input className="input" type="time" name="finishTime" value={finishTime} onChange={e => setFinishTime(e.target.value)} required /></td>
                <td><input className="input" type="number" name="breakLength" value={breakLength} onChange={e => setBreakLength(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Shifts;