import * as actionTypes from './actionTypes'
import axios from '../../lovecodeaxios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const auth = () => {
  return dispatch => {
    dispatch(authStart());
    // axios.get('/get-github-token')
    //   .then(response => {
    //     console.log(response.data);
    //   })
  }
}
