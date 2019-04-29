import { GameObjects, Input } from 'phaser'

const { Container } = GameObjects

class Hero extends Container {
  constructor (config) {
    const {
      x,
      y,
      scene,
    } = config
    const width = 100
    const height = 200
    const texture = 'hero-potato'
    const half = 0.5
    const why = 0.22
    const jumpHeight = 300
    const core = scene.add.sprite(x, y, texture)
    core.setOrigin(half, why)
    super(scene, x, y, [
      core,
    ])
    this.core = core
    this.jumpHeight = jumpHeight
    scene.add.container(this)
    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.body.setSize(width, height)

    this.arrows = scene.input.keyboard.createCursorKeys()
    this.WSAD = {
      w: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
      s: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S),
      a: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
      d: scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
    }
  }

  update () {
    const { arrows, WSAD, core, jumpHeight } = this
    const { left, right, up } = arrows
    const { a, d, w } = WSAD
    const isTouchingGround = (this.body.blocked.down)
    const velocityX = (Number(right.isDown) | Number(d.isDown)) - (Number(left.isDown) | Number(a.isDown))
    const magicNumber = 200
    this.body.setVelocityX(velocityX * magicNumber)
    if (isTouchingGround && (up.isDown || w.isDown)) {
      this.body.setVelocityY(-jumpHeight)
    }
    if (velocityX < 0) {
      core.setFlipX(true)
    } else if (velocityX > 0) {
      core.setFlipX(false)
    }
    if (this.body.velocity.y < 0) {
      core.anims.play('hero-jump', true)
    } else if (this.body.velocity.y > 0) {
      core.anims.play('hero-fall', true)
    } else if (this.body.velocity.x) {
      core.anims.play('hero-run', true)
    } else {
      core.anims.play('hero-idle', true)
    }
  }
}

export default Hero
