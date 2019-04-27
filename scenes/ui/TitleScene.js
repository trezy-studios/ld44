import { Scene } from 'phaser'

class TitleScene extends Scene {
  constructor () {
    super('scene-ui-title')
  }

  static create () {
    console.log('made it to the title!')
  }
}

export default TitleScene
