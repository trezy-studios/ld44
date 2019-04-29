// Local imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const savesReducer = (state = initialState.saves, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.INITIALIZE_GAME_STATE:
      return {
        ...state,
        [payload.id]: {},
      }

    default:
      return state
  }
}





export default savesReducer
