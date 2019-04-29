import { combineReducers } from 'redux'
import currentGameStateID from './currentGameStateID'
import debug from './debug'
import hotbars from './hotbars'
import inventory from './inventory'
import saves from './saves'





export default combineReducers({
  currentGameStateID,
  debug,
  hotbars,
  inventory,
  saves,
})
