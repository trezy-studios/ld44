// Module imports
import uuid from 'uuid/v4'





// Local imports
import actionTypes from '../actionTypes'





const initializeGameState = () => dispatch => {
  const id = uuid()

  dispatch({
    payload: { id },
    type: actionTypes.INITIALIZE_GAME_STATE,
  })

  return id
}





const loadGameState = id => dispatch => {
  dispatch({
    payload: { id },
    type: actionTypes.LOAD_GAME_STATE,
  })
}





const saveGameState = id => dispatch => {
  dispatch({
    payload: { id },
    type: actionTypes.SAVE_GAME_STATE,
  })
}





export {
  initializeGameState,
  loadGameState,
  saveGameState,
}
