import * as actionTypes from './actionTypes'

export const setRepoData = ( data ) => {
  return {
    type: actionTypes.SET_REPO_DATA,
    data: data
  }
}
