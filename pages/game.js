// Module imports
import React from 'react'





// Local imports
import { Hotbar } from '../components'
import { isBrowser } from '../helpers'





const Game = () => {
  if (isBrowser()) {
    /* eslint-disable global-require */
    const { GameComponent } = require('../components/GameComponent')
    /* eslint-enable */

    return (
      <>
        <GameComponent />
        <Hotbar />
      </>
    )
  }

  return null
}





export default Game
