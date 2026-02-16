import Phaser from 'phaser'

export type UpgradeChoice = 'fire_rate' | 'damage'

export class LevelUpMenu {
  private overlay: Phaser.GameObjects.Rectangle
  private title: Phaser.GameObjects.Text
  private btnFireRate: Phaser.GameObjects.Container
  private btnDamage: Phaser.GameObjects.Container
  private onChoose: ((choice: UpgradeChoice) => void) | null = null

  constructor(scene: Phaser.Scene) {
    const { width, height } = scene.scale

    // Semi-transparent overlay
    this.overlay = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
    this.overlay.setScrollFactor(0)
    this.overlay.setDepth(3000)

    // Title
    this.title = scene.add.text(width / 2, height / 2 - 100, 'SUBIU DE NÍVEL!', {
      fontSize: '32px',
      fontFamily: 'monospace',
      color: '#f1fa8c',
      fontStyle: 'bold',
    })
    this.title.setOrigin(0.5)
    this.title.setScrollFactor(0)
    this.title.setDepth(3001)

    // Button: Fire Rate
    this.btnFireRate = this.createButton(
      scene,
      width / 2,
      height / 2,
      'Vel. de Tiro',
      '+Velocidade de disparo',
      0x60c659,
      () => this.choose('fire_rate'),
    )

    // Button: Damage
    this.btnDamage = this.createButton(
      scene,
      width / 2,
      height / 2 + 90,
      'Dano',
      '+Dano dos projéteis',
      0xe63946,
      () => this.choose('damage'),
    )

    this.setVisible(false)
  }

  private createButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    desc: string,
    color: number,
    onClick: () => void,
  ): Phaser.GameObjects.Container {
    const bg = scene.add.rectangle(0, 0, 260, 70, color, 0.9)
    bg.setStrokeStyle(2, 0xffffff)

    const titleText = scene.add.text(0, -12, label, {
      fontSize: '22px',
      fontFamily: 'monospace',
      color: '#ffffff',
      fontStyle: 'bold',
    })
    titleText.setOrigin(0.5)

    const descText = scene.add.text(0, 14, desc, {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#dddddd',
    })
    descText.setOrigin(0.5)

    const container = scene.add.container(x, y, [bg, titleText, descText])
    container.setScrollFactor(0)
    container.setDepth(3001)
    container.setSize(260, 70)
    container.setInteractive()
    container.on('pointerdown', onClick)

    return container
  }

  private choose(choice: UpgradeChoice): void {
    if (this.onChoose) {
      this.onChoose(choice)
    }
  }

  show(callback: (choice: UpgradeChoice) => void): void {
    this.onChoose = callback
    this.setVisible(true)
  }

  hide(): void {
    this.onChoose = null
    this.setVisible(false)
  }

  private setVisible(visible: boolean): void {
    this.overlay.setVisible(visible)
    this.title.setVisible(visible)
    this.btnFireRate.setVisible(visible)
    this.btnDamage.setVisible(visible)

    // Enable/disable interactivity
    if (visible) {
      this.btnFireRate.setInteractive()
      this.btnDamage.setInteractive()
    } else {
      this.btnFireRate.disableInteractive()
      this.btnDamage.disableInteractive()
    }
  }

  reposition(width: number, height: number): void {
    this.overlay.setPosition(width / 2, height / 2)
    this.overlay.setSize(width, height)
    this.title.setPosition(width / 2, height / 2 - 100)
    this.btnFireRate.setPosition(width / 2, height / 2)
    this.btnDamage.setPosition(width / 2, height / 2 + 90)
  }
}
