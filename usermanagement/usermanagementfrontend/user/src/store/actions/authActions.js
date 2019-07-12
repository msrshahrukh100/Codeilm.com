import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authenticated, user) => {
  localStorage.setItem('authenticated', authenticated)
  return {
    type: actionTypes.AUTH_SUCCESS,
    authenticated: authenticated,
    user: user
  }
}

export const authLogout = () => {
  localStorage.setItem('authenticated', "")
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const auth = () => {
  return dispatch => {
    dispatch(authStart());
    axios.get('/api/v1/get-auth-status/')
      .then(response => {

        response && dispatch(authSuccess(response.data.authenticated ? "true" : "", response.data.user))
      })
      .catch(error => {
        console.log(error);
      })
  }
}
