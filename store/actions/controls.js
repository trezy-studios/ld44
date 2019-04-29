// Local imports
import actionTypes from '../actionTypes'





const setControlState = (key, isPressed) => (dispatch, getState) => {
  const { controls } = getState()
  const keymap = {
    escape: {
      mapping: 'pause',
      type: 'toggle',
    },
  }
  const keymapping = keymap[key]
  let shouldDispatch = false
  let controlState = null

  if (keymapping) {
    switch (controls[keymapping.mapping].type) {
      case 'hold':
        shouldDispatch = true
        controlState = isPressed
        break

      case 'press':
      case 'toggle':
      default:
        if (isPressed) {
          shouldDispatch = true
          controlState = !controls[keymapping.mapping].isActive
        }
        break
    }
  }

  if (shouldDispatch) {
    dispatch({
      payload: {
        control: keymapping.mapping,
        controlState,
        key,
      },
      type: actionTypes.SET_CONTROL_STATE,
    })
  }
}

const unsetPressControls = () => (dispatch, getState) => {
  const { controls } = getState()
  const controlUpdates = {}
  let shouldDispatch = false

  Object.entries(controls).forEach(([control, controlState]) => {
    if (controlState.type === 'press' && controlState.isActive) {
      controlUpdates[control] = false
      shouldDispatch = true
    }
  })

  if (shouldDispatch) {
    dispatch({
      payload: { controlUpdates },
      type: actionTypes.UNSET_PRESS_CONTROLS,
    })
  }
}





export {
  setControlState,
  unsetPressControls,
}
