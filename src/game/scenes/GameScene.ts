import Phaser from 'phaser'
import { EventBus } from '../EventBus'
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { Projectile } from '../entities/Projectile'
import { XpGem } from '../entities/XpGem'
import { Joystick } from '../ui/Joystick'
import { HealthBar } from '../ui/HealthBar'
import { XpBar } from '../ui/XpBar'
import { LevelUpMenu } from '../ui/LevelUpMenu'
import type { UpgradeChoice } from '../ui/LevelUpMenu'
import {
  ENEMY_SPAWN_INTERVAL,
  ENEMY_SPAWN_DISTANCE,
  PROJECTILE_BASE_DAMAGE,
  PROJECTILE_BASE_FIRE_RATE,
  PROJECTILE_FIRE_RATE_UPGRADE,
  PROJECTILE_DAMAGE_UPGRADE,
  XP_PER_LEVEL,
  XP_COLLECT_RADIUS,
} from '../config/constants'

export class GameScene extends Phaser.Scene {
  private player!: Player
  private joystick!: Joystick
  private joystickKeys!: Phaser.Types.Input.Keyboard.CursorKeys
  private kbKeys?: Phaser.Types.Input.Keyboard.CursorKeys
  private ground!: Phaser.GameObjects.TileSprite

  // Groups
  private enemies!: Phaser.GameObjects.Group
  private projectiles!: Phaser.GameObjects.Group
  private xpGems!: Phaser.GameObjects.Group

  // UI
  private healthBar!: HealthBar
  private xpBar!: XpBar
  private levelUpMenu!: LevelUpMenu

  // Timers
  private spawnTimer!: Phaser.Time.TimerEvent
  private shootTimer!: Phaser.Time.TimerEvent

  // State
  private gameOver: boolean = false
  private paused: boolean = false

  // Stats (upgradable)
  private fireRate: number = PROJECTILE_BASE_FIRE_RATE
  private projectileDamage: number = PROJECTILE_BASE_DAMAGE

  // XP / Level
  private xp: number = 0
  private level: number = 1
  private xpToNextLevel: number = XP_PER_LEVEL

  constructor() {
    super({ key: 'GameScene' })
  }

  create(): void {
    const { width, height } = this.scale
    this.gameOver = false
    this.paused = false
    this.fireRate = PROJECTILE_BASE_FIRE_RATE
    this.projectileDamage = PROJECTILE_BASE_DAMAGE
    this.xp = 0
    this.level = 1
    this.xpToNextLevel = XP_PER_LEVEL

    // Infinite repeating ground
    this.ground = this.add.tileSprite(0, 0, width, height, 'groundTile')
    this.ground.setOrigin(0, 0)
    this.ground.setScrollFactor(0)
    this.ground.setDepth(-1)

    // Player at world center
    this.player = new Player(this, 0, 0)

    // Camera follows player
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1)

    // Virtual joystick
    this.joystick = new Joystick(this)
    this.joystickKeys = this.joystick.createCursorKeys()

    // Keyboard support
    if (this.input.keyboard) {
      this.kbKeys = this.input.keyboard.createCursorKeys()
    }

    // Groups
    this.enemies = this.add.group({ runChildUpdate: true })
    this.projectiles = this.add.group({ runChildUpdate: true })
    this.xpGems = this.add.group()

    // Collisions
    this.physics.add.overlap(
      this.player.sprite,
      this.enemies,
      () => this.handleEnemyHit(),
    )
    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (_proj, _enemy) =>
        this.handleProjectileHit(_proj as Projectile, _enemy as Enemy),
    )
    this.physics.add.overlap(
      this.player.sprite,
      this.xpGems,
      (_player, _gem) => this.handleGemCollect(_gem as XpGem),
    )

    // Spawn timer
    this.spawnTimer = this.time.addEvent({
      delay: ENEMY_SPAWN_INTERVAL,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    })

    // Auto-shoot timer
    this.shootTimer = this.time.addEvent({
      delay: this.fireRate,
      callback: this.autoShoot,
      callbackScope: this,
      loop: true,
    })

    // UI
    this.healthBar = new HealthBar(this)
    this.xpBar = new XpBar(this)
    this.levelUpMenu = new LevelUpMenu(this)

    // Handle resize
    this.scale.on('resize', this.handleResize, this)

    EventBus.emit('current-scene-ready', this)
  }

  update(_time: number, _delta: number): void {
    if (this.gameOver || this.paused) return

    this.player.update(this.joystickKeys, this.kbKeys)

    // Scroll ground
    this.ground.tilePositionX = this.cameras.main.scrollX
    this.ground.tilePositionY = this.cameras.main.scrollY

    // Update UI
    this.healthBar.update(this.player.health, this.player.maxHealth)
    this.xpBar.update(this.xp, this.xpToNextLevel, this.level)

    // Auto-collect nearby gems
    this.xpGems.getChildren().forEach((g) => {
      const gem = g as XpGem
      if (!gem.active) return
      const dx = gem.x - this.player.x
      const dy = gem.y - this.player.y
      if (dx * dx + dy * dy < XP_COLLECT_RADIUS * XP_COLLECT_RADIUS) {
        this.collectGem(gem)
      }
    })
  }

  // --- Shooting ---

  private autoShoot(): void {
    if (this.gameOver || this.paused || !this.player.alive) return

    const nearest = this.findNearestEnemy()
    if (!nearest) return

    const proj = new Projectile(
      this,
      this.player.x,
      this.player.y,
      nearest.x,
      nearest.y,
      this.projectileDamage,
    )
    this.projectiles.add(proj)
  }

  private findNearestEnemy(): Enemy | null {
    let closest: Enemy | null = null
    let closestDist = Infinity

    this.enemies.getChildren().forEach((e) => {
      const enemy = e as Enemy
      const dx = enemy.x - this.player.x
      const dy = enemy.y - this.player.y
      const dist = dx * dx + dy * dy
      if (dist < closestDist) {
        closestDist = dist
        closest = enemy
      }
    })

    return closest
  }

  private handleProjectileHit(proj: Projectile, enemy: Enemy): void {
    if (!proj.active || !enemy.active) return

    // Drop XP gem at enemy position
    const gem = new XpGem(this, enemy.x, enemy.y)
    this.xpGems.add(gem)

    // Destroy both
    proj.destroy()
    enemy.destroy()
  }

  // --- XP / Level Up ---

  private handleGemCollect(gem: XpGem): void {
    this.collectGem(gem)
  }

  private collectGem(gem: XpGem): void {
    if (!gem.active) return

    this.xp += gem.value
    gem.destroy()

    if (this.xp >= this.xpToNextLevel) {
      this.triggerLevelUp()
    }
  }

  private triggerLevelUp(): void {
    this.level++
    this.xp = 0
    this.xpToNextLevel = XP_PER_LEVEL + (this.level - 1) * 3

    // Pause gameplay
    this.paused = true
    this.physics.pause()

    this.levelUpMenu.show((choice: UpgradeChoice) => {
      this.applyUpgrade(choice)
      this.levelUpMenu.hide()
      this.paused = false
      this.physics.resume()
    })
  }

  private applyUpgrade(choice: UpgradeChoice): void {
    if (choice === 'fire_rate') {
      this.fireRate = Math.max(200, this.fireRate - PROJECTILE_FIRE_RATE_UPGRADE)
      // Recreate shoot timer with new rate
      this.shootTimer.remove()
      this.shootTimer = this.time.addEvent({
        delay: this.fireRate,
        callback: this.autoShoot,
        callbackScope: this,
        loop: true,
      })
    } else {
      this.projectileDamage += PROJECTILE_DAMAGE_UPGRADE
    }
  }

  // --- Enemy ---

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

  // --- Game Over ---

  private handleGameOver(): void {
    this.gameOver = true
    this.spawnTimer.remove()
    this.shootTimer.remove()

    // Stop all enemies
    this.enemies.getChildren().forEach((e) => {
      const body = (e as Phaser.GameObjects.Rectangle)
        .body as Phaser.Physics.Arcade.Body
      body.setVelocity(0, 0)
    })

    this.player.sprite.setFillStyle(0x666666)

    const cx = this.cameras.main.centerX
    const cy = this.cameras.main.centerY

    const overlay = this.add.rectangle(
      cx, cy, this.scale.width, this.scale.height, 0x000000, 0.6,
    )
    overlay.setScrollFactor(0)
    overlay.setDepth(2000)

    const text = this.add.text(cx, cy - 40, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'monospace',
      color: '#e63946',
      fontStyle: 'bold',
    })
    text.setOrigin(0.5)
    text.setScrollFactor(0)
    text.setDepth(2001)

    const stats = this.add.text(cx, cy + 10, `Nível ${this.level}`, {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#f1fa8c',
    })
    stats.setOrigin(0.5)
    stats.setScrollFactor(0)
    stats.setDepth(2001)

    const restart = this.add.text(cx, cy + 50, 'Toque para recomeçar', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#ffffff',
    })
    restart.setOrigin(0.5)
    restart.setScrollFactor(0)
    restart.setDepth(2001)

    this.input.once('pointerdown', () => {
      this.scene.restart()
    })
  }

  // --- Resize ---

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize

    this.ground.setSize(width, height)
    this.joystick.reposition(width, height)
    this.healthBar.reposition(width)
    this.xpBar.reposition(width)
    this.levelUpMenu.reposition(width, height)
    this.cameras.main.setSize(width, height)
  }

  shutdown(): void {
    this.scale.off('resize', this.handleResize, this)
    this.joystick.destroy()
  }
}
