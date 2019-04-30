import { Scene } from 'phaser'

class PreloaderScene extends Scene {
  constructor () {
    super('scene-preloader')
  }

  preload () {
    // this.load.image('hero', '/static/images/bob.png')
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
    this.load.spritesheet('hero-sword-arm', '/static/images/hero-sword-arm.png', {
      frameWidth: 340,
      frameHeight: 260,
    })
    this.load.multiatlas('hero', '/static/images/hero/hero.json', '/static/images/hero/packed')
  }

  create () {
    this.anims.create({
      key: 'potato-idle',
      frames: this.anims.generateFrameNames('hero-potato', { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'potato-run',
      frames: this.anims.generateFrameNames('hero-potato', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'potato-fall',
      frames: this.anims.generateFrameNames('hero-potato', { start: 3, end: 3 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.create({
      key: 'potato-jump',
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
    // Hero
    this.anims.create({
      key: 'hero-idle',
      frames: this.anims.generateFrameNames('hero', {
        prefix: 'idle/', start: 1, end: 3, zeroPad: 2, suffix: '.png',
      }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-run',
      frames: this.anims.generateFrameNames('hero', {
        prefix: 'run/', start: 1, end: 13, zeroPad: 2, suffix: '.png',
      }),
      frameRate: 16,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-up',
      frames: this.anims.generateFrameNames('hero', {
        prefix: 'up/', start: 1, end: 2, zeroPad: 2, suffix: '.png',
      }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-down',
      frames: this.anims.generateFrameNames('hero', {
        prefix: 'down/', start: 1, end: 2, zeroPad: 2, suffix: '.png',
      }),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: 'hero-swing',
      frames: this.anims.generateFrameNames('hero', {
        prefix: 'swing/', start: 1, end: 4, zeroPad: 2, suffix: '.png',
      }),
      frameRate: 16,
      repeat: 0,
    })
    this.scene.start('scene-ui-title')
  }
}

export default PreloaderScene
