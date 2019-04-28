import { Scene } from 'phaser'

class PreloaderScene extends Scene {
  constructor () {
    super('scene-preloader')
  }

  create () {
    this.scene.start('scene-ui-title')
  }
}

export default PreloaderScene
