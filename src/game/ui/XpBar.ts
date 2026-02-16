import Phaser from 'phaser'
import {
  XP_BAR_WIDTH,
  XP_BAR_HEIGHT,
  XP_BAR_Y,
  XP_BAR_BG_COLOR,
  XP_BAR_FG_COLOR,
} from '../config/constants'

export class XpBar {
  private bg: Phaser.GameObjects.Rectangle
  private bar: Phaser.GameObjects.Rectangle
  private label: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    const cx = scene.scale.width / 2

    this.bg = scene.add.rectangle(cx, XP_BAR_Y, XP_BAR_WIDTH, XP_BAR_HEIGHT, XP_BAR_BG_COLOR)
    this.bg.setScrollFactor(0)
    this.bg.setDepth(999)

    this.bar = scene.add.rectangle(cx, XP_BAR_Y, 0, XP_BAR_HEIGHT, XP_BAR_FG_COLOR)
    this.bar.setScrollFactor(0)
    this.bar.setDepth(1000)

    this.label = scene.add.text(cx, XP_BAR_Y, 'Nv. 1', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#ffffff',
    })
    this.label.setOrigin(0.5)
    this.label.setScrollFactor(0)
    this.label.setDepth(1001)
  }

  update(xp: number, xpNeeded: number, level: number): void {
    const pct = Math.min(1, xp / xpNeeded)
    const w = XP_BAR_WIDTH * pct

    this.bar.setSize(w, XP_BAR_HEIGHT)
    this.bar.setX(this.bg.x - (XP_BAR_WIDTH - w) / 2)

    this.label.setText(`Nv. ${level}`)
  }

  reposition(width: number): void {
    const cx = width / 2
    this.bg.setX(cx)
    this.bar.setX(cx)
    this.label.setX(cx)
  }
}
