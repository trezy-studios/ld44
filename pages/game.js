// Module imports
import React from 'react'





// Local imports
import { isBrowser } from '../helpers'





class LD44 extends React.Component {
  componentDidMount () {
    if (isBrowser()) {
      /* eslint-disable global-require */
      const Phaser = require('phaser')
      /* eslint-enable */

      const { Game, WEBGL } = Phaser

      this.game = new Game({
        canvas: this.canvas.current,
        type: WEBGL,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 },
          },
        },
        scale: {
          height: window.innerHeight,
          mode: Phaser.Scale.RESIZE,
          parent: 'body',
          width: window.innerWidth,
        },
        scene: {
          create: () => {},
          preload: () => {},
        },
      })
    }
  }

  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  render () {
    return (
      <>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <canvas ref={this.canvas} />
        {/* eslint-enable */}
      </>
    )
  }
}





export default LD44
