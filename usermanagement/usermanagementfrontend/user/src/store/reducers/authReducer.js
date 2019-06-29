import * as actionTypes from '../actions/actionTypes'

const initialState = {
  authenticated: null,
  user: null,
  authLoading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return {...state, authLoading: true, error: null}
    case actionTypes.AUTH_SUCCESS: return {authenticated: action.authenticated, user: action.user, authLoading: false, error: null}
    case actionTypes.AUTH_LOGOUT: return {authenticated: "", user: null, authLoading: false, error: null}
    case actionTypes.AUTH_FAIL: return {...state, error: action.error, authLoading: false}
    default:
      return state
  }
}

export default reducer
