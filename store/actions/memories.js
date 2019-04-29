// Module imports
import uuid from 'uuid/v4'





// Local imports
import actionTypes from '../actionTypes'





const captureMemory = () => dispatch => {
  // const processedItem = { ...item }

  // if (!processedItem.quantity) {
  //   processedItem.quantity = 1
  // }

  // if (!processedItem.quality) {
  //   processedItem.quality = 'common'
  // }

  dispatch({
    payload: {
      id: uuid(),
    },
    type: actionTypes.CAPTURE_MEMORY,
  })
}





export {
  captureMemory,
}
