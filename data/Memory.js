// Local imports
import config from '../game.config'





// Local constants
// @Trezy this is not a constant, it is changed on lines 52 and 56
let MEMORY_MAX_INSTANCES = 0





class Memory {
  /***************************************************************************\
    Static Methods
  \***************************************************************************/

  static hasSpaceLeft () {
    return MEMORY_MAX_INSTANCES <= config.MEMORY.MAX_INSTANCES
  }





  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  movie = new Blob()
  maxValue = 1
  currentValue = 1
  event = 'none'
  effect = 'none'
  captureStartTimeMS = null





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor () {
    if (MEMORY_MAX_INSTANCES > config.MEMORY.MAX_INSTANCES) {
      throw config.ERRORS.MEMORY.MEMORY_LIMIT_EXCEDED
    }
    MEMORY_MAX_INSTANCES += 1
  }

  destroy () {
    MEMORY_MAX_INSTANCES -= 1
    delete this
  }

  startCapture () {
    this.captureStartTimeMS = performance.now()
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get canCapture () {
    return (this.captureStartTimeMS + config.MEMORY.MAX_DURATION) >= performance.now()
  }
}





export { Memory }
