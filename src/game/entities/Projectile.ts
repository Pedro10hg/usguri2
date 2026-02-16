import Phaser from 'phaser'
import {
  PROJECTILE_RADIUS,
  PROJECTILE_COLOR,
  PROJECTILE_SPEED,
  PROJECTILE_RANGE,
} from '../config/constants'

export class Projectile extends Phaser.GameObjects.Arc {
  public body!: Phaser.Physics.Arcade.Body
  public damage: number
  private startX: number
  private startY: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    targetX: number,
    targetY: number,
    damage: number,
  ) {
    super(scene, x, y, PROJECTILE_RADIUS, 0, 360, false, PROJECTILE_COLOR)

    this.damage = damage
    this.startX = x
    this.startY = y

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.body.setCircle(PROJECTILE_RADIUS)

    // Calculate direction toward target
    const dx = targetX - x
    const dy = targetY - y
    const len = Math.sqrt(dx * dx + dy * dy)

    if (len > 0) {
      this.body.setVelocity(
        (dx / len) * PROJECTILE_SPEED,
        (dy / len) * PROJECTILE_SPEED,
      )
    }
  }

  update(): void {
    // Destroy if traveled beyond range
    const dx = this.x - this.startX
    const dy = this.y - this.startY
    if (dx * dx + dy * dy > PROJECTILE_RANGE * PROJECTILE_RANGE) {
      this.destroy()
    }
  }
}
