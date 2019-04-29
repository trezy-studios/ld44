// Local imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const currentGameStateIDReducer = (state = initialState.currentGameStateID, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.INITIALIZE_GAME_STATE:
      return payload.id

    default:
      return state
  }
}





export default currentGameStateIDReducer
