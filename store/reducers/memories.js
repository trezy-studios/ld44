// Local imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const memoriesReducer = (state = initialState.memories, action) => {
  const {
    payload,
    type,
  } = action
  const newMemoryStore = { ...state.memoryStore }
  const newState = {
    ...state,
    memoryStore: newMemoryStore,
  }

  switch (type) {
    case actionTypes.START_MEMORY_CAPTURE:
      newState.shouldStartCapture = true
      return newState

    case actionTypes.STOP_MEMORY_CAPTURE:
      newState.shouldStartCapture = false
      return newState

    case actionTypes.ADD_MEMORY:
      newMemoryStore[payload.id] = payload
      return newState

    default:
      return state
  }
}





export default memoriesReducer
