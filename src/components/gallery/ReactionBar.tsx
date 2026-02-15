'use client'

import { toggleReaction } from '@/app/galeria/actions'
import type { ReactionCount } from '@/types'

const REACTIONS = {
  like: { emoji: '👍', label: 'Curtir' },
  love: { emoji: '❤️', label: 'Amar' },
  fire: { emoji: '🔥', label: 'Fogo' },
} as const

interface Props {
  postId: string
  counts: ReactionCount[]
  currentUserId: string | null
}

export function ReactionBar({ postId, counts, currentUserId }: Props) {
  const countMap = Object.fromEntries(counts.map((c) => [c.reaction_type, c.count]))

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(REACTIONS) as Array<keyof typeof REACTIONS>).map((type) => {
        const count = countMap[type] ?? 0
        return (
          <form key={type} action={toggleReaction}>
            <input type="hidden" name="post_id" value={postId} />
            <input type="hidden" name="reaction_type" value={type} />
            <button
              type="submit"
              disabled={!currentUserId}
              className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span>{REACTIONS[type].emoji}</span>
              {count > 0 && <span>{count}</span>}
            </button>
          </form>
        )
      })}
    </div>
  )
}
