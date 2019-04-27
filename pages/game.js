// Module imports
import React from 'react'





// Local imports
import { isBrowser } from '../helpers'





const Game = () => {
  if (isBrowser()) {
    /* eslint-disable global-require */
    const { GameComponent } = require('../components/GameComponent')
    /* eslint-enable */

    return (
      <GameComponent />
    )
  }

  return null
}





export default Game
