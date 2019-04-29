// Module imports
import LocalForage from 'localforage'
import uuid from 'uuid/v4'





// Local imports
import actionTypes from '../actionTypes'





const addMemory = () => dispatch => {
  const id = uuid();

  (async () => {
    const memoryIDs = await LocalForage.getItem('memories')
    memoryIDs.push(id)
    await LocalForage.setItem('memories', memoryIDs)
  })()

  dispatch({
    payload: { id },
    type: actionTypes.ADD_MEMORY,
  })

  return id
}





const loadMemories = () => async dispatch => {
  const memoryIDs = await LocalForage.getItem('memories')

  dispatch({
    payload: { ids: memoryIDs },
    type: actionTypes.LOAD_MEMORIES,
  })
}





const startMemoryCapture = () => dispatch => dispatch({ type: actionTypes.START_MEMORY_CAPTURE })





const stopMemoryCapture = () => dispatch => dispatch({ type: actionTypes.STOP_MEMORY_CAPTURE })





export {
  addMemory,
  loadMemories,
  startMemoryCapture,
  stopMemoryCapture,
}
