// Module imports
import { Scene, Input } from 'phaser'





// Local imports
import { connectNonReactComponent as connect } from '../../store'
import Hero from '../../sprites/Hero'





@connect
class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create () {
    this.cameras.main.setBackgroundColor('#738')
    this.map = new Map()
    const x = 50
    const y = 50
    const potsArr = []
    for (let px = 200; px <= 2000; px += 200) {
      potsArr.push(
        this.physics.add.sprite(px, 50, 'pot-smash').setScale(0.5)
      )
    }
    const pots = this.physics.add.group(potsArr)
    pots.setDepth(1)
    const player = new Hero({
      x,
      y,
      scene: this,
    })
    player.setDepth(2)
    this.map.set('pots', pots)
    this.map.set('player', player)
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
    this.physics.add.collider(
      pots,
      solidLayer,
    )
    this.physics.add.overlap(
      player.getSwordArm(),
      pots,
      this.breakPot.bind(this)
    )
    this.map.set('map', map)
    this.cameras.main.startFollow(this.map.get('player'))

    this.map.set('monies', 0)
  }

  breakPot (swordArm, potInQuestion) {
    if (swordArm.frame.name === 1 && potInQuestion.frame.name === 0) {
      potInQuestion.anims.play('pot-smash-smash', true)
      const monies = this.map.get('monies')
      this.map.set('monies', monies + 1)
    }
  }

  update () {
    const player = this.map.get('player')
    player.update()
  }
}





export default LevelNub
