'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Send, Trash2 } from 'lucide-react'
import { resolveStorageUrl } from '@/lib/supabase'
import { addComment, deleteComment } from '@/app/galeria/actions'
import type { GalleryComment } from '@/types'

interface Props {
  postId: string
  comments: GalleryComment[]
  currentUserId: string | null
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'agora'
  if (mins < 60) return `${mins}min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return `${days}d`
}

export function CommentSection({ postId, comments, currentUserId }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Comentários ({comments.length})
      </h3>

      <div className="mt-3 space-y-3">
        {comments.map((comment) => {
          const avatarUrl = resolveStorageUrl(comment.profile?.avatar_url ?? null)
          return (
            <div key={comment.id} className="flex gap-2">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-guri-green-500 text-xs font-bold text-white">
                  {(comment.profile?.display_name ?? '?').slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/perfil/${comment.profile?.username ?? ''}`}
                    className="text-xs font-semibold hover:underline"
                  >
                    {comment.profile?.display_name ?? `@${comment.profile?.username}`}
                  </Link>
                  <span className="text-xs text-slate-400">{timeAgo(comment.created_at)}</span>
                  {currentUserId === comment.user_id && (
                    <form action={deleteComment} className="ml-auto">
                      <input type="hidden" name="id" value={comment.id} />
                      <button type="submit" className="text-slate-400 hover:text-red-500">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </form>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{comment.content}</p>
              </div>
            </div>
          )
        })}
      </div>

      {currentUserId ? (
        <form
          ref={formRef}
          action={async (formData) => {
            await addComment(formData)
            formRef.current?.reset()
          }}
          className="mt-4 flex gap-2"
        >
          <input type="hidden" name="post_id" value={postId} />
          <input
            name="content"
            placeholder="Escreva um comentário..."
            required
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-guri-green-500 focus:ring-1 focus:ring-guri-green-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-guri-green-500 px-4 py-2 text-white transition-colors hover:bg-guri-green-600"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          <Link href="/login" className="text-guri-green-500 hover:underline">
            Faça login
          </Link>{' '}
          para comentar.
        </p>
      )}
    </div>
  )
}
