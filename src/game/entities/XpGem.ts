import Phaser from 'phaser'
import { XP_GEM_RADIUS, XP_GEM_COLOR, XP_GEM_VALUE } from '../config/constants'

export class XpGem extends Phaser.GameObjects.Arc {
  public body!: Phaser.Physics.Arcade.Body
  public value: number = XP_GEM_VALUE

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, XP_GEM_RADIUS, 0, 360, false, XP_GEM_COLOR)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.body.setCircle(XP_GEM_RADIUS)
    this.body.setImmovable(true)
  }
}
