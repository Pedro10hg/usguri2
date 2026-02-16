import Phaser from 'phaser'
import {
  GROUND_TILE_SIZE,
  GROUND_COLOR_PRIMARY,
  GROUND_COLOR_SECONDARY,
} from '../config/constants'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  create(): void {
    // Generate ground tile texture procedurally (checkerboard)
    const g = this.add.graphics()
    const half = GROUND_TILE_SIZE / 2

    g.fillStyle(GROUND_COLOR_PRIMARY)
    g.fillRect(0, 0, GROUND_TILE_SIZE, GROUND_TILE_SIZE)

    g.fillStyle(GROUND_COLOR_SECONDARY)
    g.fillRect(0, 0, half, half)
    g.fillRect(half, half, half, half)

    g.generateTexture('groundTile', GROUND_TILE_SIZE, GROUND_TILE_SIZE)
    g.destroy()

    this.scene.start('GameScene')
  }
}
