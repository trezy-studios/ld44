// Local imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const memoriesReducer = (state = initialState.memories, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.CAPTURE_MEMORY:
      return {
        ...state,
        [payload.id]: payload,
      }

    default:
      return state
  }
}





export default memoriesReducer
