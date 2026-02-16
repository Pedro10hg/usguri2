import Phaser from 'phaser'
import { EventBus } from '../EventBus'
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { Joystick } from '../ui/Joystick'
import { HealthBar } from '../ui/HealthBar'
import { ENEMY_SPAWN_INTERVAL, ENEMY_SPAWN_DISTANCE } from '../config/constants'

export class GameScene extends Phaser.Scene {
  private player!: Player
  private joystick!: Joystick
  private joystickKeys!: Phaser.Types.Input.Keyboard.CursorKeys
  private kbKeys?: Phaser.Types.Input.Keyboard.CursorKeys
  private ground!: Phaser.GameObjects.TileSprite
  private enemies!: Phaser.GameObjects.Group
  private healthBar!: HealthBar
  private spawnTimer!: Phaser.Time.TimerEvent
  private gameOver: boolean = false

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    const { width, height } = this.scale
    this.gameOver = false

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

    // Enemy group
    this.enemies = this.add.group({ runChildUpdate: true })

    // Enemy-Player collision (overlap to detect contact)
    this.physics.add.overlap(
      this.player.sprite,
      this.enemies,
      () => this.handleEnemyHit(),
    )

    // Enemy-Enemy collision (so they push each other apart)
    this.physics.add.collider(this.enemies, this.enemies)

    // Spawn timer
    this.spawnTimer = this.time.addEvent({
      delay: ENEMY_SPAWN_INTERVAL,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    })

    // Health bar UI
    this.healthBar = new HealthBar(this)

    // Handle resize
    this.scale.on('resize', this.handleResize, this)

    EventBus.emit('current-scene-ready', this)
  }

  update(_time: number, _delta: number): void {
    if (this.gameOver) return

    this.player.update(this.joystickKeys, this.kbKeys)

    // Scroll ground tile to follow camera
    this.ground.tilePositionX = this.cameras.main.scrollX
    this.ground.tilePositionY = this.cameras.main.scrollY

    // Update health bar
    this.healthBar.update(this.player.health, this.player.maxHealth)
  }

  private spawnEnemy(): void {
    if (this.gameOver) return

    const cam = this.cameras.main
    const angle = Math.random() * Math.PI * 2
    const dist = Math.max(cam.width, cam.height) / 2 + ENEMY_SPAWN_DISTANCE

    const x = this.player.x + Math.cos(angle) * dist
    const y = this.player.y + Math.sin(angle) * dist

    const enemy = new Enemy(this, x, y, this.player)
    this.enemies.add(enemy)
  }

  private handleEnemyHit(): void {
    const hit = this.player.takeDamage(this.time.now)

    if (hit && this.player.health > 0) {
      // Flash player red briefly
      this.player.sprite.setFillStyle(0xe63946)
      this.time.delayedCall(150, () => {
        if (this.player.alive) {
          this.player.sprite.setFillStyle(0x60c659)
        }
      })
    }

    if (!this.player.alive) {
      this.handleGameOver()
    }
  }

  private handleGameOver(): void {
    this.gameOver = true
    this.spawnTimer.remove()

    // Stop all enemies
    this.enemies.getChildren().forEach((e) => {
      const body = (e as Phaser.GameObjects.Rectangle)
        .body as Phaser.Physics.Arcade.Body
      body.setVelocity(0, 0)
    })

    // Fade player out
    this.player.sprite.setFillStyle(0x666666)

    // Show game over text
    const cx = this.cameras.main.centerX
    const cy = this.cameras.main.centerY

    const overlay = this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.6)
    overlay.setScrollFactor(0)
    overlay.setDepth(2000)

    const text = this.add.text(cx, cy - 30, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'monospace',
      color: '#e63946',
      fontStyle: 'bold',
    })
    text.setOrigin(0.5)
    text.setScrollFactor(0)
    text.setDepth(2001)

    const restart = this.add.text(cx, cy + 30, 'Toque para recomeçar', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#ffffff',
    })
    restart.setOrigin(0.5)
    restart.setScrollFactor(0)
    restart.setDepth(2001)

    // Restart on tap/click
    this.input.once('pointerdown', () => {
      this.scene.restart()
    })
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.ground.setSize(width, height)
    this.joystick.reposition(width, height)
    this.healthBar.reposition(width)
    this.cameras.main.setSize(width, height)
  }

  shutdown(): void {
    this.scale.off('resize', this.handleResize, this)
    this.joystick.destroy()
  }
}
