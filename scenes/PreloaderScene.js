import { Scene } from 'phaser'

class PreloaderScene extends Scene {
  constructor () {
    super('scene-preloader')
  }

  preload () {
    this.load.image('hero', '/static/images/bob.png')
    this.load.image('bob-tiles', '/static/images/tileset1.png')
    this.load.tilemapTiledJSON('bob-world', '/static/maps/BobWorld.json')
  }

  create () {
    this.scene.start('scene-ui-title')
  }
}

export default PreloaderScene
