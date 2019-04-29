/* eslint-disable consistent-return */
// Component imports
import initialState from '../initialState'




const debugReducer = (state = initialState.debug, action) => {
  const { type } = action

  switch (type) {
    default:
      return state
  }
}

export default debugReducer
/* eslint-enable */
