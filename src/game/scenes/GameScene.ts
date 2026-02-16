import Phaser from 'phaser'
import { EventBus } from '../EventBus'
import { Player } from '../entities/Player'
import { Joystick } from '../ui/Joystick'

export class GameScene extends Phaser.Scene {
  private player!: Player
  private joystick!: Joystick
  private joystickKeys!: Phaser.Types.Input.Keyboard.CursorKeys
  private kbKeys?: Phaser.Types.Input.Keyboard.CursorKeys
  private ground!: Phaser.GameObjects.TileSprite

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    const { width, height } = this.scale

    // Infinite repeating ground (scrollFactor 0, tilePosition tracks camera)
    this.ground = this.add.tileSprite(0, 0, width, height, 'groundTile')
    this.ground.setOrigin(0, 0)
    this.ground.setScrollFactor(0)
    this.ground.setDepth(-1)

    // Player at world center
    this.player = new Player(this, 0, 0)

    // Camera follows player with smooth lerp
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1)

    // Virtual joystick (bottom-left)
    this.joystick = new Joystick(this)
    this.joystickKeys = this.joystick.createCursorKeys()

    // Keyboard support for desktop
    if (this.input.keyboard) {
      this.kbKeys = this.input.keyboard.createCursorKeys()
    }

    // Handle resize
    this.scale.on('resize', this.handleResize, this)

    EventBus.emit('current-scene-ready', this)
  }

  update(): void {
    this.player.update(this.joystickKeys, this.kbKeys)

    // Scroll ground tile to follow camera
    this.ground.tilePositionX = this.cameras.main.scrollX
    this.ground.tilePositionY = this.cameras.main.scrollY
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.ground.setSize(width, height)
    this.joystick.reposition(width, height)
    this.cameras.main.setSize(width, height)
  }

  shutdown(): void {
    this.scale.off('resize', this.handleResize, this)
    this.joystick.destroy()
  }
}
