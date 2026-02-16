'use client'

import dynamic from 'next/dynamic'

const PhaserGame = dynamic(() => import('@/game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <p className="animate-pulse text-lg text-white">Carregando jogo...</p>
    </div>
  ),
})

export default function GamePlayPage() {
  return <PhaserGame />
}
