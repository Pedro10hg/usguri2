import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js'
import {
  JOYSTICK_BASE_RADIUS,
  JOYSTICK_THUMB_RADIUS,
  JOYSTICK_BASE_COLOR,
  JOYSTICK_THUMB_COLOR,
  JOYSTICK_BASE_ALPHA,
  JOYSTICK_THUMB_ALPHA,
  JOYSTICK_FORCE_MIN,
  JOYSTICK_MARGIN,
} from '../config/constants'

export class Joystick {
  private joystick: VirtualJoystick
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    const { height } = scene.scale
    const x = JOYSTICK_MARGIN
    const y = height - JOYSTICK_MARGIN

    const base = scene.add.circle(
      0,
      0,
      JOYSTICK_BASE_RADIUS,
      JOYSTICK_BASE_COLOR,
      JOYSTICK_BASE_ALPHA,
    )
    base.setScrollFactor(0)
    base.setDepth(1000)

    const thumb = scene.add.circle(
      0,
      0,
      JOYSTICK_THUMB_RADIUS,
      JOYSTICK_THUMB_COLOR,
      JOYSTICK_THUMB_ALPHA,
    )
    thumb.setScrollFactor(0)
    thumb.setDepth(1001)

    this.joystick = new VirtualJoystick(scene, {
      x,
      y,
      radius: JOYSTICK_BASE_RADIUS,
      base,
      thumb,
      dir: '8dir',
      forceMin: JOYSTICK_FORCE_MIN,
      fixed: true,
      enable: true,
    })
  }

  createCursorKeys() {
    return this.joystick.createCursorKeys()
  }

  reposition(_width: number, height: number): void {
    this.joystick.setPosition(JOYSTICK_MARGIN, height - JOYSTICK_MARGIN)
  }

  destroy(): void {
    this.joystick.destroy()
  }
}
