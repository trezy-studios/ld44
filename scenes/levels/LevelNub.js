import { Scene, Input } from 'phaser'
import { state } from '../../data'

window.state = state
class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create () {
    this.state = new Map()
    const playerX = 50
    const playerY = 50
    this.state.set('player', this.physics.add.sprite(playerX, playerY, 'hero'))
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
    this.cameras.main.startFollow(this.state.get('player'))
  }

  update () {
    const player = this.state.get('player')
    const keyboard = this.state.get('keys')
    const velocityX = (Number(keyboard.right.isDown) | Number(this.WSAD.d.isDown)) - (Number(keyboard.left.isDown) | Number(this.WSAD.a.isDown))
    const magicNumber = 200
    player.setVelocityX(velocityX * magicNumber)
  }
}

export default LevelNub
