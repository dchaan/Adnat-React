import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const login = user => {
  return dispatch => {
    axios
      .post('auth/login', {
        email: user.email,
        password: user.password
      })
      .then(res => {
        let sessionToken = res.data.sessionId;
        dispatch({
          type: 'LOGIN',
          sessionToken
        });
      })
      .catch(err => {
        let errMsg = err.response ? err.response.data.error : 'Unable to connect';
        dispatch({
          type: 'LOGIN_ERROR',
          err: errMsg
        });
      });
  };
};

export const signup = user => {
  return dispatch => {
    axios
      .post('auth/signup', {
        name: user.name,
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation
      })
      .then(res => {
        let sessionToken = res.data.sessionId;
        dispatch({
          type: 'SIGNUP',
          sessionToken
        });
      })
      .catch(err => {
        let errMsg = err.response.data.error;
        dispatch({
          type: 'SIGNUP_ERROR',
          err: errMsg
        });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    let sessionToken = getState().sessionToken;
    if (sessionToken) {
      axios
        .delete('auth/logout', {
          headers: {
            Authorization: sessionToken,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          dispatch({
            type: 'LOGOUT',
          });
        })
        .catch(err => {
          dispatch({
            type: 'LOGOUT_ERROR',
            err
          });
        });
    }
  };
};