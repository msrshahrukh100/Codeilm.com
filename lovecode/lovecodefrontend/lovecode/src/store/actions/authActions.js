import * as actionTypes from './actionTypes'
import axios from '../../lovecodeaxios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authToken: token,
    user: user
  }
}

export const auth = () => {
  return dispatch => {
    dispatch(authStart());
    axios.get('/get-github-token')
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data.token, response.data.user))
      })
      .catch(error => {
        console.log(error);
      })
  }
}
