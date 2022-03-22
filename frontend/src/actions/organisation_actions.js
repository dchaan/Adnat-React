import axios from 'axios';
import _ from 'lodash';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAllOrgs = () => {
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
      req.get('/organisations')
        .then(res => {
          let orgs = res.data;
          dispatch({
            type: 'GET_ALL_ORGS',
            orgs
          })
        })
        .catch(err => {
          let errMsg = err.response.data.error;
          dispatch({
            type: 'GET_ALL_ORGS_ERROR',
            err: errMsg
          })
        });
    }
  }
}

export const joinOrg = organisationId => {
  return (dispatch, getState) => {
    if (!getState().profile.organisationId && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          post: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.post('/organisations/join', {
        organisationId
      })
      .then(res => {
        let org = {
          id: res.data.id,
          name: res.data.name,
          hourlyRate: res.data.hourlyRate
        }
        dispatch({
          type: 'JOIN_ORG',
          org
        })
      })
      .catch(err => {
        let errMsg = err.response.data.error;
        dispatch({
          type: 'JOIN_ORG_ERROR',
          err: errMsg
        })
      });
    }
  }
}

export const leaveOrg = () => {
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
      req.post('organisations/leave')
        .then(res => {
          let user = {
            organisationId: res.data.organisationId,
            name: res.data.name,
            email: res.data.email
          }
          dispatch({
            type: "LEAVE_ORG",
            user
          })
        })
        .catch(err => {
          dispatch({
            type: 'LEAVE_ORG_ERROR',
            err
          })
        });
    }
  }
}

export const createAndJoinOrg = org => {
  return (dispatch, getState) => {
    if (!getState().profile.organisationId && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          post: {
            'Authorization': sessionToken,
            'Content-Type': 'application/json'
          }
        }
      });
      req.post('/organisations/create_and_join', {
        name: org.name,
        hourlyRate: org.hourlyRate
      })
      .then(res => {
        let newOrg = {
          id: res.data.id,
          name: res.data.name,
          hourlyRate: res.data.hourlyRate
        }
        dispatch({
          type: 'CREATE_AND_JOIN_ORG',
          newOrg
        })
      });
    }
  }
}
export const updateOrg = org => {
  return (dispatch, getState) => {
    if (org.id && getState().sessionToken) {
      let sessionToken = getState().sessionToken;
      let req = axios.create({
        headers: {
          put: {
            'Authorization': sessionToken,
            'Content-type': 'application/json'
          }
        }
      });
      let orgId = org.id;
      let updatedOrgData = _.omit(org, ['id']);
      req.put(`/organisations/${org.id}`, {
        ...updatedOrgData
      })
      .then(res => {
        if (res.status === 200) {
          let orgs = getState().orgs;
          let orgIdx = _.findIndex(orgs, function(o) {
            return o.id === orgId;
          });
          let currentOrg = orgs[orgIdx];
          let updatedOrg = {
            ...currentOrg,
            ...updatedOrgData
          };
          orgs[orgIdx] = updatedOrg;
          dispatch({
            type: 'UPDATE_ORG',
            orgs
          })
        }
      })
      .catch(err => {
        dispatch({
          type: 'UPDATE_ORG_ERROR',
          err
        })
      });
    }
  }
}