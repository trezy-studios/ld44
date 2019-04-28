import { Scene } from 'phaser'

class PreloaderScene extends Scene {
  constructor () {
    super('scene-preloader')
  }

  preload () {
    this.load.image('hero', '/static/iamges/bob.png')
    this.load.image('tile', '/static/iamges/tileset1.png')
  }

  create () {
    this.scene.start('scene-ui-title')
  }
}

export default PreloaderScene
