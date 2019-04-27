// Module imports
import React from 'react'





// Local imports
import { PageWrapper } from '../components'
import { isBrowser } from '../helpers'





class Game extends React.Component {
  componentDidMount () {
    if (isBrowser()) {
      /* eslint-disable global-require */
      this.phaser = require('phaser')
      /* eslint-enable */

      this.game = new this.phaser.Game({
        canvas: this.canvas.current,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: {
          create: () => {},
          preload: () => {},
        },
        type: this.phaser.AUTO,
        width: 800,
      })
    }
  }

  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  render () {
    return (
      <PageWrapper title="GAEM">
        <header>
          <h2>It's a heading!</h2>
        </header>

        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <canvas ref={this.canvas} />
        {/* eslint-enable */}
      </PageWrapper>
    )
  }
}





export default Game
