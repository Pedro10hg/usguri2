declare module 'phaser3-rex-plugins/plugins/virtualjoystick.js' {
  import Phaser from 'phaser'

  interface VirtualJoystickConfig {
    x?: number
    y?: number
    radius?: number
    base?: Phaser.GameObjects.GameObject
    thumb?: Phaser.GameObjects.GameObject
    dir?: 'up&down' | 'left&right' | '4dir' | '8dir'
    forceMin?: number
    fixed?: boolean
    enable?: boolean
  }

  export default class VirtualJoystick {
    constructor(scene: Phaser.Scene, config?: VirtualJoystickConfig)
    force: number
    forceX: number
    forceY: number
    angle: number
    rotation: number
    up: boolean
    down: boolean
    left: boolean
    right: boolean
    noKey: boolean
    setPosition(x: number, y: number): this
    setEnable(enable?: boolean): this
    toggleEnable(): this
    setVisible(visible: boolean): this
    toggleVisible(): this
    createCursorKeys(): Phaser.Types.Input.Keyboard.CursorKeys
    destroy(): void
    on(event: string, fn: Function, context?: unknown): this
  }
}
