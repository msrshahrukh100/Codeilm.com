import * as actionTypes from '../actions/actionTypes'

const initialState = {
  projectId: "",
  isDeveloper: false,
  isPoster: false,
  isPosterOrDeveloper: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_META: return {...state, projectId: action.projectId,
      isDeveloper: action.isDeveloper,
      isPoster: action.isPoster,
      isPosterOrDeveloper: action.isPosterOrDeveloper
    }
    default:
      return state
  }
}

export default reducer
