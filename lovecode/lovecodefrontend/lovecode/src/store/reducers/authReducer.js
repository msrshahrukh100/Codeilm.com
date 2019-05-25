import * as actionTypes from '../actions/actionTypes'

const initialState = {
  authToken: null,
  user: null,
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return {...state, loading: true, error: null}
    case actionTypes.AUTH_SUCCESS: return {authToken: action.authToken, user: action.user, loading: false, error: null}
    case actionTypes.AUTH_FAIL: return {...state, error: action.error, loading: false}
    default:
      return state
  }
}

export default reducer
