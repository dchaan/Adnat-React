import axios from "axios";
import moment from "moment";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllShifts = () => {
  return (dispatch, getState) => {
    if (getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          get: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.get('/shifts')
        .then(res => {
          let shifts = res.data;
          dispatch({
            type: 'GET_ALL_SHIFTS',
            shifts
          });
        })
        .catch(err => {
          let errMsg = err.response.data.error;
          dispatch({
            type: 'GET_ALL_SHIFTS_ERROR',
            err: errMsg
          });
        });
    }
  }
}

export const createShift = shift => {
  return (dispatch, getState) => {
    if (getState().profile.organisationId && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          post: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      let shiftDate = shift.shiftDate;
      let formattedShiftDate = moment(shiftDate).format('MM-DD-YYYY');
      let start = `${formattedShiftDate} ${shift.startTime}`;
      let finish = `${formattedShiftDate} ${shift.finishTime}`;
      let breakLength = shift.breakLength ? shift.breakLength : 0;

      req.post('/shifts', {
        userId: getState().profile.personalId,
        start: start,
        finish: finish,
        breakLength: breakLength
      })
      .then(res => {
        let shift = res.data;
        let shiftIdx = getState().shifts.length;
        dispatch({
          type: 'CREATE_SHIFT',
          index: shiftIdx,
          item: shift
        });
      })
      .catch(err => {
        let errMsg = err.response.data.error;
        dispatch({
          type: 'CREATE_SHIFT_ERROR',
          err: errMsg
        });
      });
    }
  }
}