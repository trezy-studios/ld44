import { GameObjects } from 'phaser'

const { Container } = GameObjects

class Enemy extends Container {
  constructor (config) {
    const {
      x,
      y,
      scene,
    } = config
    const width = 100
    const height = 200
    const texture = 'enemy-potato'
    const jumpHeight = 500
    const core = scene.add.sprite(0, 0, texture)
    core.setOrigin(0, 0)
    super(scene, x, y, [
      core,
    ])
    this.core = core
    this.jumpHeight = jumpHeight
    this.spriteWidth = width
    this.spriteHeight = height
    scene.add.container(this)
    scene.physics.world.enable(this)
    scene.add.existing(this)
    this.body.setSize(width, height)
    this.isAttacking = false
    this.isSwinging = false
    this.isDead = false
    this.isDeadFrame = 0
  }

  tick () {
    console.log('tick', this)
  }

  update () {
    console.log('update')
    const {
      core,
    } = this
    if (this.isDead) {
      return
    }
    // const velocityX = (Number(right.isDown) | Number(d.isDown)) - (Number(left.isDown) | Number(a.isDown))
    const velocityX = 100
    const magicNumber = 500
    this.body.setVelocityX(velocityX * magicNumber)
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

  setIsDead (bool) {
    this.isDead = bool
    if (this.isDead) {
      setTimeout(() => {
        this.destroy(true)
      }, 1000)
    }
  }
}

export default Enemy
