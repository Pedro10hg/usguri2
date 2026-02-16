'use client'

import { useEffect, useRef } from 'react'
import { createGame } from './main'
import { EventBus } from './EventBus'
import type Phaser from 'phaser'

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    gameRef.current = createGame(containerRef.current)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
      EventBus.removeAllListeners()
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full" />
}
