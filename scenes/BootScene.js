import { Scene } from 'phaser'

class BootScene extends Scene {
  constructor () {
    super('scene-boot')
  }

  create () {
    this.scene.start('scene-preloader')
  }
}

export default BootScene
