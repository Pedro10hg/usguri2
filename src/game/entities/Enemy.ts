import Phaser from 'phaser'
import { ENEMY_SIZE, ENEMY_COLOR, ENEMY_SPEED } from '../config/constants'

export class Enemy extends Phaser.GameObjects.Rectangle {
  public body!: Phaser.Physics.Arcade.Body
  private target: { x: number; y: number }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    target: { x: number; y: number },
  ) {
    super(scene, x, y, ENEMY_SIZE, ENEMY_SIZE, ENEMY_COLOR)

    this.target = target
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.body.setSize(ENEMY_SIZE, ENEMY_SIZE)
    this.body.setCollideWorldBounds(false)
  }

  update(): void {
    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const len = Math.sqrt(dx * dx + dy * dy)

    if (len > 0) {
      this.body.setVelocity(
        (dx / len) * ENEMY_SPEED,
        (dy / len) * ENEMY_SPEED,
      )
    }
  }
}
