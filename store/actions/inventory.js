// Local imports
import actionTypes from '../actionTypes'





const addItem = item => dispatch => {
  const processedItem = { ...item }

  if (!processedItem.quantity) {
    processedItem.quantity = 1
  }

  dispatch({
    payload: { item: processedItem },
    type: actionTypes.ADD_ITEM,
  })
}





const destroyItem = item => dispatch => {
  dispatch({
    payload: { item },
    type: actionTypes.DESTROY_ITEM,
  })
}





const moveItems = items => dispatch => {
  dispatch({
    payload: { items },
    type: actionTypes.MOVE_ITEMS,
  })
}





export {
  addItem,
  destroyItem,
  moveItems,
}
