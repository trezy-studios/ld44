// Module imports
import Phaser, {
  Game,
  WEBGL,
} from 'phaser'
import React from 'react'

// Boot scenes
import BootScene from '../scenes/BootScene'
import PreloaderScene from '../scenes/PreloaderScene'

// UI scenes
import TitleScene from '../scenes/ui/TitleScene'

// Levels / areas
import LevelNub from '../scenes/levels/LevelNub'

class GameComponent extends React.Component {
  componentDidMount () {
    this.game = new Game({
      canvas: this.canvas.current,
      type: WEBGL,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 400 },
        },
      },
      scale: {
        height: window.innerHeight,
        mode: Phaser.Scale.RESIZE,
        parent: document.querySelector('[role=application]'),
        width: window.innerWidth,
      },
      scene: [
        BootScene,
        PreloaderScene,
        TitleScene,
        LevelNub,
      ],
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
