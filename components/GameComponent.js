// Module imports
import Phaser, {
  Game,
  WEBGL,
} from 'phaser'
import React from 'react'





class GameComponent extends React.Component {
  componentDidMount () {
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
        parent: document.querySelector('[role=application]'),
        width: window.innerWidth,
      },
      scene: {
        create: () => {},
        preload: () => {},
      },
    })
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





export { GameComponent }
