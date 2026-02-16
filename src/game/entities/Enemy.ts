import Phaser from 'phaser'
import type { EnemyTier } from '../config/constants'

export class Enemy extends Phaser.GameObjects.Rectangle {
  public body!: Phaser.Physics.Arcade.Body
  private target: { x: number; y: number }
  private hp: number
  private originalColor: number
  private speed: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    target: { x: number; y: number },
    tier: EnemyTier,
  ) {
    super(scene, x, y, tier.size, tier.size, tier.color)

    this.target = target
    this.hp = tier.hp
    this.originalColor = tier.color
    this.speed = tier.speed

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.body.setSize(tier.size, tier.size)
    this.body.setCollideWorldBounds(false)
  }

  /** Takes damage, returns true if dead */
  takeDamage(amount: number): boolean {
    this.hp -= amount
    if (this.hp <= 0) return true

    // White flash on hit
    this.setFillStyle(0xffffff)
    this.scene.time.delayedCall(80, () => {
      if (this.active) {
        this.setFillStyle(this.originalColor)
      }
    })
    return false
  }

  update(): void {
    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const len = Math.sqrt(dx * dx + dy * dy)

    if (len > 0) {
      this.body.setVelocity(
        (dx / len) * this.speed,
        (dy / len) * this.speed,
      )
    }
  }
}
