// Local imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'




const hotbarsReducer = (state = initialState.hotbars, action) => {
  const {
    payload,
    type,
  } = action

  switch (type) {
    case actionTypes.ADD_HOTBAR:

      return {
        ...state,
        [payload.id]: payload,
      }

    default:
      return state
  }
}





export default hotbarsReducer
