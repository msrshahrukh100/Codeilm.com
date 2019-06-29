import * as actionTypes from '../actions/actionTypes'

const initialState = {
  repoData: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_REPO_DATA:
      return {
        ...state,
        repoData: action.data
      }
  }
  return state
}

export default reducer
