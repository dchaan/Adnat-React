import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getUserInfo = () => {
  return (dispatch, getState) => {
    if (!getState().profile && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          get: {
            'Authorization': sessionToken,
            'Content-Type': 'application.json'
          }
        }
      });
      req.get('/users/user/info')
        .then(res => {
          let userInfo = {
            userId: res.data.id,
            organizationId: res.data.organisationId,
            name: res.data.name,
            email: res.data.email
          }
          dispatch({
            type: 'USER_INFO',
            userInfo
          })
        })
        .catch(err => {
          dispatch({
            type: 'USER_INFO_ERROR',
            err
          })
        });
    }
  }
}

export const updateUserInfo = info => {
  return (dispatch, getState) => {
    if (getState().profile && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          put: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.put('/users/user/update', {
        ...info
      })
      .then(res => {
        let userInfo = {
          organizationId: res.data.organisationId,
          name: res.data.name,
          email: res.data.email
        }
        dispatch({
          type: 'UPDATE_USER_INFO',
          userInfo
        })
      })
      .catch(err => {
        dispatch({
          type: 'UPDATE_USER_INFO_ERROR',
          err
        })
      });
    }
  }
}

export const updateUserPassword = passwords => {
  return (dispatch, getState) => {
    if (getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          put: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.put('/users/user/update_password', {
        ...passwords
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'UPDATE_PASSWORD',
          })
        }
      })
      .catch(err => {
        let errMsg = err.response.data.error;
        dispatch({
          type: 'UPDATE_PASSWORD_ERROR',
          err: errMsg
        })
      });
    }
  }
}

export const getUsersInOrg = () => {
  return (dispatch, getState) => {
    if (getState().sessionToken && getState().profile.organisationId) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          get: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.get('/users')
        .then(res => {
          dispatch({
            type: 'GET_USERS_IN_ORG',
            users: res.data
          })
        })
        .catch(err => {
          dispatch({
            type: 'GET_USERS_IN_ORG_ERROR',
            err
          })
        });
    }
  }
}