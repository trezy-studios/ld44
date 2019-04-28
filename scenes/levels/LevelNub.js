// Module imports
import { Scene, Input } from 'phaser'





// Local imports
import { connectNonReactComponent as connect } from '../../store'





@connect
class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create () {
    this.map = new Map()
    const playerX = 50
    const playerY = 50
    this.map.set('player', this.physics.add.sprite(playerX, playerY, 'hero'))
    this.map.set('keys', this.input.keyboard.createCursorKeys())
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
      this.map.get('player'),
      solidLayer
    )
    this.map.set('map', map)
    this.cameras.main.startFollow(this.map.get('player'))
  }

  update () {
    const player = this.map.get('player')
    const keyboard = this.map.get('keys')
    const velocityX = (Number(keyboard.right.isDown) | Number(this.WSAD.d.isDown)) - (Number(keyboard.left.isDown) | Number(this.WSAD.a.isDown))
    const magicNumber = 200
    player.setVelocityX(velocityX * magicNumber)
  }
}





export default LevelNub
