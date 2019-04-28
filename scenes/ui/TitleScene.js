import { Scene } from 'phaser'

class TitleScene extends Scene {
  constructor () {
    super('scene-ui-title')
  }

  create () {
    this.scene.start('scene-level-nub')
  }
}

export default TitleScene
