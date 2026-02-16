'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  getTop10,
  saveScore,
  getCurrentUser,
} from '../services/ranking'
import type { RankingEntry } from '../services/ranking'

interface GameOverOverlayProps {
  score: number
  level: number
  onRestart: () => void
}

export function GameOverOverlay({
  score,
  level,
  onRestart,
}: GameOverOverlayProps) {
  const [name, setName] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUserId(user.id)
        setName(user.displayName ?? '')
      }
    })
    getTop10().then(setRanking)
  }, [])

  const handleSave = useCallback(async () => {
    if (!name.trim() || saved || saving) return
    setSaving(true)
    const ok = await saveScore(name.trim(), score, level)
    if (ok) {
      setSaved(true)
      const updated = await getTop10()
      setRanking(updated)
    }
    setSaving(false)
  }, [name, score, level, saved, saving])

  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm space-y-5 rounded-2xl bg-slate-900 p-6 text-center shadow-2xl">
        {/* Title */}
        <h2 className="text-4xl font-black text-red-500">GAME OVER</h2>

        {/* Stats */}
        <div className="flex justify-center gap-6">
          <div>
            <p className="text-3xl font-bold text-yellow-300">{score}</p>
            <p className="text-xs text-slate-400">Kills</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">Nv. {level}</p>
            <p className="text-xs text-slate-400">Nível</p>
          </div>
        </div>

        {/* Save score (logged-in only) */}
        {userId && !saved && (
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              maxLength={20}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-center text-lg text-white placeholder-slate-500 outline-none focus:border-green-500"
            />
            <button
              onClick={handleSave}
              disabled={!name.trim() || saving}
              className="w-full rounded-lg bg-gradient-to-r from-green-500 to-blue-500 py-3 text-lg font-bold text-white transition-opacity disabled:opacity-40"
            >
              {saving ? 'Salvando...' : 'Salvar no Ranking'}
            </button>
          </div>
        )}

        {saved && (
          <p className="text-sm font-medium text-green-400">
            Salvo no ranking!
          </p>
        )}

        {!userId && (
          <p className="text-xs text-slate-500">
            Faça login para salvar no ranking
          </p>
        )}

        {/* Top 10 */}
        <div className="text-left">
          <h3 className="mb-2 text-center text-sm font-bold text-slate-300">
            Top 10
          </h3>
          {ranking.length > 0 ? (
            <ol className="space-y-1">
              {ranking.map((entry, i) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-5 text-center font-bold ${
                        i === 0
                          ? 'text-yellow-400'
                          : i === 1
                            ? 'text-slate-300'
                            : i === 2
                              ? 'text-amber-600'
                              : 'text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white">{entry.name}</span>
                  </span>
                  <span className="font-mono text-yellow-300">
                    {entry.score}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-center text-xs text-slate-500">
              Nenhum score ainda
            </p>
          )}
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="w-full rounded-lg border-2 border-slate-600 py-3 text-lg font-bold text-white transition-colors hover:border-white"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  )
}
