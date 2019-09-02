import * as actionTypes from './actionTypes'
import axios from '../../projects_axios'

const debug = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"


export const metaDataReceived = data => {
  return {
    type: actionTypes.PROJECT_META,
    isDeveloper: data.auth_user_is_developer,
    isPoster: data.auth_user_is_poster,
    isPosterOrDeveloper: data.auth_user_is_poster || data.auth_user_is_developer
  }
}


export const getProjectMetaData = projectId => {
  return dispatch => {
    axios.get(`/${projectId}/meta-data`)
      .then(response => {
        response && dispatch(metaDataReceived(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}
