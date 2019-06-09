import * as actionTypes from './actionTypes'
import axios from '../../lovecodeaxios'

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
    axios.get('/get-auth-status')
      .then(response => {
        dispatch(authSuccess(response.data.authenticated ? "true" : "", response.data.user))
      })
      .catch(error => {
        console.log(error);
      })
  }
}
