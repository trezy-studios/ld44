// Module imports
import React from 'react'





// Local imports
import { isBrowser } from '../helpers'
import { Hotbar } from '../components'





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
