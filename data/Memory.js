// Local imports
import config from '../game.config'





// Local constants
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
    return (this.captureStartTimeMS + config.MEMORY_MAX_LENGTH_MS) >= performance.now()
  }
}





export { Memory }
