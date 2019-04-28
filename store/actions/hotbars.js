// Module imports
import uuid from 'uuid/v4'





// Local imports
import actionTypes from '../actionTypes'





const addHotbar = (horizontalAlignment, verticalAlignment, slots) => dispatch => {
  const id = uuid()

  dispatch({
    payload: {
      horizontalAlignment,
      id,
      slots: Array(slots).fill(null),
      verticalAlignment,
    },
    type: actionTypes.ADD_HOTBAR,
  })

  return id
}





export {
  addHotbar,
}
