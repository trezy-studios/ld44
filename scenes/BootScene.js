import { Scene } from 'phaser'

class BootScene extends Scene {
  constructor () {
    super('scene-boot')
  }

  create () {
    console.log('start boot scene', this)
    this.scene.start('scene-preloader')
  }
}

export default BootScene
