import { Scene } from 'phaser'

class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create () {
    console.log('start nub level', this)
  }

  update () {
    console.log('ree', this)
  }
}

export default LevelNub
