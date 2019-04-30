// Module imports
import { Scene, Input } from 'phaser'





// Local imports
import {
  actions,
  connectNonReactComponent as connect,
} from '../../store'
import Hero from '../../sprites/Hero'
import Enemy from '../../sprites/Enemy'




@connect
class LevelNub extends Scene {
  constructor () {
    super('scene-level-nub')
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#738')
    this.cameras.main.setBounds(0, 0, 30000, 4000)
    this.map = new Map()
    const potsArr = []
    this.map.set('keys', this.input.keyboard.createCursorKeys())
    this.map.set('enemy', [])
    this.WSAD = {
      w: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
      s: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S),
      a: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
      d: this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
    }
    const key = 'new-world'
    const tileWidth = 100
    const tileHeight = 100
    const map = this.make.tilemap({
      key,
      tileWidth,
      tileHeight,
    })
    const mapObjects = map.objects[0].objects
    for (let i = 0; i < mapObjects.length; i += 1) {
      const { x, y, name } = mapObjects[i]
      switch (name) {
        case 'PlayerSpawn': {
          const player = new Hero({
            x,
            y,
            scene: this,
          })
          player.setDepth(2)
          this.map.set('player', player)
          break
        }
        case 'PotSpawn': {
          potsArr.push(this.physics.add.sprite(x, y, 'pot-smash').setScale(0.5))
          break
        }
        case 'EnemySpawn': {
          const enemy = new Enemy({
            x,
            y,
            scene: this,
          })
          enemy.setDepth(Math.round(Math.random()) + 2)
          this.map.get('enemy').push(enemy)
          break
        }
        default:
          break
      }
    }
    const pots = this.physics.add.group(potsArr)
    pots.setDepth(1)
    this.map.set('pots', pots)
    const tileset = map.addTilesetImage(
      'Tileset',
      'tile-image'
    )
    const collisionStart = 1
    const collisionEnd = 10
    const solidLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)
    solidLayer.setCollisionBetween(collisionStart, collisionEnd)
    this.physics.add.collider(
      this.map.get('player'),
      solidLayer
    )
    const enemies = this.map.get('enemy')
    for (let i = 0; i < enemies.length; i += 1) {
      this.physics.add.collider(
        enemies[i],
        solidLayer
      )
      this.physics.add.overlap(
        this.map.get('player').getSwordArm(),
        enemies[i],
        this.hitEnemy
      )
    }
    this.physics.add.collider(
      pots,
      solidLayer,
    )
    this.physics.add.overlap(
      this.map.get('player').getSwordArm(),
      pots,
      this.breakPot
    )
    this.map.set('map', map)
    this.cameras.main.startFollow(this.map.get('player'))

    this.map.set('monies', 0)

    // Musicz
    const music = this.sound.add('music-theme-main', {
      loop: true,
    })
    music.play()
  }

  hitEnemy = (swordArm, enemy) => {
    if (swordArm.frame.name === 1 && !enemy.isDead) {
      console.log('hit', swordArm, enemy)
      enemy.setIsDead(true)
    }
  }

  breakPot = (swordArm, potInQuestion) => {
    const { dispatch } = this.store
    const { startMemoryCapture } = actions.memories

    if (swordArm.frame.name === 1 && potInQuestion.frame.name === 0) {
      if (!potInQuestion.anims.isPlaying) {
        dispatch(startMemoryCapture())
      }

      potInQuestion.anims.play('pot-smash-smash', true)

      const monies = this.map.get('monies')
      this.map.set('monies', monies + 1)
    }
  }

  update = () => {
    const player = this.map.get('player')
    player.update()
  }
}





export default LevelNub
