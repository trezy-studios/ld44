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
    const swordArmTexture = 'sword-arm'
    const jumpHeight = 500
    const core = scene.add.sprite(0, 0, texture)
    const swordArm = scene.physics.add.sprite(0, 0, swordArmTexture)
    swordArm.body.setAllowGravity(false)
    swordArm.setOrigin(0.41, 0.47)
    swordArm.setPosition((width / 2), (height / 2))
    core.setOrigin(0, 0)
    super(scene, x, y, [
      core,
      swordArm,
    ])
    this.core = core
    this.jumpHeight = jumpHeight
    this.swordArm = swordArm
    this.spriteWidth = width
    this.spriteHeight = height
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

    this.isAttacking = false
    this.isSwinging = false
  }

  getSwordArm () {
    return this.swordArm
  }

  update () {
    const {
      arrows,
      WSAD,
      core,
      swordArm,
      jumpHeight,
      isAttacking,
      isSwinging,
      spriteWidth,
      spriteHeight,
    } = this
    const { left, right, up, down } = arrows
    const { a, d, w, s } = WSAD
    const isTouchingGround = (this.body.blocked.down)
    const velocityX = (Number(right.isDown) | Number(d.isDown)) - (Number(left.isDown) | Number(a.isDown))
    const magicNumber = 500
    if (isAttacking) {
      core.setFrame(5)
      swordArm.setFrame(1)
      if (core.flipX) {
        swordArm.setPosition((spriteWidth / 2 + 5), (spriteHeight / 2 + 15))
      } else {
        swordArm.setPosition((spriteWidth / 2 - 5), (spriteHeight / 2 + 15))
      }
      this.body.setVelocityX(0)
      if (!isSwinging) {
        this.scene.tweens.add({
          targets: swordArm,
          rotation: (
            core.flipX
              ? (Math.PI - (Math.PI * 1.5))
              : (Math.PI / 2)
          ),
          ease: 'Power1',
          duration: 150,
          yoyo: false,
          repeat: 0,
          onComplete: () => {
            swordArm.setFrame(0)
            swordArm.setPosition((spriteWidth / 2), (spriteHeight / 2))
            swordArm.setRotation(Math.PI + (Math.PI * 0.95))
            this.isAttacking = false
            this.isSwinging = false
          },
        })
        this.isSwinging = true
      }
    } else {
      this.body.setVelocityX(velocityX * magicNumber)
      if (isTouchingGround && (up.isDown || w.isDown)) {
        this.body.setVelocityY(-jumpHeight)
      } else if (isTouchingGround && (down.isDown || s.isDown)) {
        this.isAttacking = true
        if (core.flipX) {
          swordArm.setRotation(((Math.PI / 2)))
        } else {
          swordArm.setRotation((Math.PI + (Math.PI / 2)))
        }
      }
      if (velocityX < 0) {
        core.setFlipX(true)
        swordArm.scaleX = -1
      } else if (velocityX > 0) {
        core.setFlipX(false)
        swordArm.scaleX = 1
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
}

export default Hero
