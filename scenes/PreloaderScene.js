import { Scene } from 'phaser'

class PreloaderScene extends Scene {
  constructor () {
    super('scene-preloader')
  }

  preload () {
    this.load.image('hero', '/static/images/bob.png')
    this.load.spritesheet('hero-potato', '/static/images/hero-potato-noarms.png', {
      frameWidth: 100,
      frameHeight: 200,
    })
    this.load.spritesheet('enemy-potato', '/static/images/hero-potato-noarms.png', {
      frameWidth: 100,
      frameHeight: 200,
    })
    this.load.spritesheet('sword-arm', '/static/images/sword-arm.png', {
      frameWidth: 200,
      frameHeight: 180,
    })
    this.load.spritesheet('pot-smash', '/static/images/pot-smash.png', {
      frameWidth: 100,
      frameHeight: 150,
    })
    this.load.image('bob-tiles', '/static/images/tileset1.png')
    this.load.tilemapTiledJSON('bob-world', '/static/maps/BobWorld.json')
    this.load.image('tile-image', '/static/images/basic-world-tiles.png')
    this.load.tilemapTiledJSON('new-world', '/static/maps/ANewWorld.json')
  }

  create () {
    this.anims.create({
      key: 'hero-idle',
      frames: this.anims.generateFrameNames('hero-potato', { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-run',
      frames: this.anims.generateFrameNames('hero-potato', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-fall',
      frames: this.anims.generateFrameNames('hero-potato', { start: 3, end: 3 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-jump',
      frames: this.anims.generateFrameNames('hero-potato', { start: 2, end: 2 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'enemy-idle',
      frames: this.anims.generateFrameNames('enemy-potato', { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'enemy-run',
      frames: this.anims.generateFrameNames('enemy-potato', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'enemy-fall',
      frames: this.anims.generateFrameNames('enemy-potato', { start: 3, end: 3 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'enemy-jump',
      frames: this.anims.generateFrameNames('enemy-potato', { start: 2, end: 2 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'pot-smash-smash',
      frames: this.anims.generateFrameNames('pot-smash', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
    })
    this.scene.start('scene-ui-title')
  }
}

export default PreloaderScene
