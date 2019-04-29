// Module imports
import uuid from 'uuid/v4'





// Local imports
import actionTypes from '../actionTypes'





const addMemory = () => dispatch => {
  const id = uuid()

  dispatch({
    payload: { id },
    type: actionTypes.ADD_MEMORY,
  })

  return id
}





const startMemoryCapture = () => dispatch => dispatch({ type: actionTypes.START_MEMORY_CAPTURE })





const stopMemoryCapture = () => dispatch => dispatch({ type: actionTypes.STOP_MEMORY_CAPTURE })





export {
  addMemory,
  startMemoryCapture,
  stopMemoryCapture,
}
