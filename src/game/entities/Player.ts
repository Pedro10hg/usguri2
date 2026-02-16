import Phaser from 'phaser'
import { PLAYER_RADIUS, PLAYER_COLOR, PLAYER_SPEED } from '../config/constants'

export class Player {
  public sprite: Phaser.GameObjects.Arc
  public body: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.circle(x, y, PLAYER_RADIUS, PLAYER_COLOR)
    scene.physics.add.existing(this.sprite)

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body
    this.body.setCircle(PLAYER_RADIUS)
    this.body.setCollideWorldBounds(false)
    this.body.setDrag(600)
  }

  update(
    joystickKeys: Phaser.Types.Input.Keyboard.CursorKeys,
    kbKeys?: Phaser.Types.Input.Keyboard.CursorKeys,
  ): void {
    let vx = 0
    let vy = 0

    const left = joystickKeys.left.isDown || kbKeys?.left.isDown
    const right = joystickKeys.right.isDown || kbKeys?.right.isDown
    const up = joystickKeys.up.isDown || kbKeys?.up.isDown
    const down = joystickKeys.down.isDown || kbKeys?.down.isDown

    if (left) vx -= 1
    if (right) vx += 1
    if (up) vy -= 1
    if (down) vy += 1

    // Normalize diagonal movement
    const len = Math.sqrt(vx * vx + vy * vy)
    if (len > 0) {
      vx = (vx / len) * PLAYER_SPEED
      vy = (vy / len) * PLAYER_SPEED
    }

    this.body.setVelocity(vx, vy)
  }

  get x(): number {
    return this.sprite.x
  }
  get y(): number {
    return this.sprite.y
  }
}
