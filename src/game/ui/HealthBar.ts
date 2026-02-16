import Phaser from 'phaser'
import {
  HEALTH_BAR_WIDTH,
  HEALTH_BAR_HEIGHT,
  HEALTH_BAR_Y,
  HEALTH_BAR_BG_COLOR,
  HEALTH_BAR_FG_COLOR,
  HEALTH_BAR_LOW_COLOR,
} from '../config/constants'

export class HealthBar {
  private bg: Phaser.GameObjects.Rectangle
  private bar: Phaser.GameObjects.Rectangle
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    const cx = scene.scale.width / 2

    this.bg = scene.add.rectangle(
      cx,
      HEALTH_BAR_Y,
      HEALTH_BAR_WIDTH,
      HEALTH_BAR_HEIGHT,
      HEALTH_BAR_BG_COLOR,
    )
    this.bg.setScrollFactor(0)
    this.bg.setDepth(999)

    this.bar = scene.add.rectangle(
      cx,
      HEALTH_BAR_Y,
      HEALTH_BAR_WIDTH,
      HEALTH_BAR_HEIGHT,
      HEALTH_BAR_FG_COLOR,
    )
    this.bar.setScrollFactor(0)
    this.bar.setDepth(1000)
  }

  update(current: number, max: number): void {
    const pct = Math.max(0, current / max)
    const w = HEALTH_BAR_WIDTH * pct

    this.bar.setSize(w, HEALTH_BAR_HEIGHT)
    // Align left edge with bg left edge
    this.bar.setX(this.bg.x - (HEALTH_BAR_WIDTH - w) / 2)

    // Turn red when low
    this.bar.setFillStyle(pct <= 0.3 ? HEALTH_BAR_LOW_COLOR : HEALTH_BAR_FG_COLOR)
  }

  reposition(width: number): void {
    const cx = width / 2
    this.bg.setX(cx)
    this.bar.setX(cx)
  }
}
