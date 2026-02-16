'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createGame } from './main'
import { EventBus } from './EventBus'
import { GameOverOverlay } from './ui/GameOverOverlay'
import type Phaser from 'phaser'
import type { GameScene } from './scenes/GameScene'

interface GameOverData {
  score: number
  level: number
}

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<GameScene | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [gameOverData, setGameOverData] = useState<GameOverData | null>(null)

  const handleRestart = useCallback(() => {
    setGameOverData(null)
    sceneRef.current?.restartGame()
  }, [])

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    gameRef.current = createGame(containerRef.current)

    const onSceneReady = (scene: GameScene) => {
      sceneRef.current = scene
    }

    const onGameOver = (data: GameOverData) => {
      setGameOverData(data)
    }

    EventBus.on('current-scene-ready', onSceneReady)
    EventBus.on('game-over', onGameOver)

    return () => {
      EventBus.off('current-scene-ready', onSceneReady)
      EventBus.off('game-over', onGameOver)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
      sceneRef.current = null
      EventBus.removeAllListeners()
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {gameOverData && (
        <GameOverOverlay
          score={gameOverData.score}
          level={gameOverData.level}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
