import { combineReducers } from 'redux'
import controls from './controls'
import currentGameStateID from './currentGameStateID'
import debug from './debug'
import hotbars from './hotbars'
import inventory from './inventory'
import memories from './memories'
import saves from './saves'





export default combineReducers({
  controls,
  currentGameStateID,
  debug,
  hotbars,
  inventory,
  memories,
  saves,
})
