import { Scene, Input } from 'phaser'
import Hero from '../../sprites/Hero'

class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create () {
    this.cameras.main.setBackgroundColor('#687')
    this.state = new Map()
    const x = 50
    const y = 50
    const width = 100
    const height = 200
    const player = new Hero({
      x,
      y,
      width,
      height,
      scene: this,
      texture: 'hero-potato',
    })
    this.state.set('player', player)
    this.state.set('keys', this.input.keyboard.createCursorKeys())
    this.WSAD = {
      w: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
      s: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S),
      a: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
      d: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
    }
    const key = 'bob-world'
    const tileWidth = 100
    const tileHeight = 100
    const map = this.make.tilemap({
      key,
      tileWidth,
      tileHeight,
    })
    const tileset = map.addTilesetImage(
      'BobWorld',
      'bob-tiles'
    )
    const collisionStart = 1
    const collisionEnd = 10
    const solidLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)
    solidLayer.setCollisionBetween(collisionStart, collisionEnd)
    this.physics.add.collider(
      this.state.get('player'),
      solidLayer
    )
    this.state.set('map', map)
    this.cameras.main.startFollow(player)
  }

  update () {
    const player = this.state.get('player')
    player.update()
  }
}

export default LevelNub
