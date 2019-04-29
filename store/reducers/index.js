import { combineReducers } from 'redux'
import debug from './debug'
import hotbars from './hotbars'
import inventory from './inventory'
import saves from './saves'





export default combineReducers({
  debug,
  hotbars,
  inventory,
  saves,
})
