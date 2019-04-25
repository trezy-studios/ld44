/* eslint-disable consistent-return */
// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const debugReducer = (state = initialState.debug, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.SET_CONTROL_STATE:
      if (payload.control) {
        if (payload.key === '`') {
          return {
            ...state,
            enabled: !state.enabled,
          }
        }
      }
      break

    case actionTypes.UPDATE_DEBUG_STATE:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}

export default debugReducer
/* eslint-enable */
