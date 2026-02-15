'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { resolveStorageUrl } from '@/lib/supabase'
import { deleteGalleryPost } from '@/app/galeria/actions'
import { ReactionBar } from './ReactionBar'
import { CommentSection } from './CommentSection'
import type { GalleryPost } from '@/types'

interface Props {
  post: GalleryPost
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

export function GalleryDetail({ post, currentUserId }: Props) {
  const imageUrl = resolveStorageUrl(post.image_url)
  const avatarUrl = resolveStorageUrl(post.profile?.avatar_url ?? null)
  const isOwner = currentUserId === post.user_id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <Link
        href="/galeria"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para galeria
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={post.caption ?? 'Foto'}
        className="w-full rounded-2xl"
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-guri-green-500 text-xs font-bold text-white">
              {(post.profile?.display_name ?? '?').slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <Link
              href={`/perfil/${post.profile?.username ?? ''}`}
              className="text-sm font-semibold hover:underline"
            >
              {post.profile?.display_name ?? `@${post.profile?.username}`}
            </Link>
            <p className="text-xs text-slate-400">{timeAgo(post.created_at)}</p>
          </div>
        </div>

        {isOwner && (
          <form action={deleteGalleryPost}>
            <input type="hidden" name="id" value={post.id} />
            <button
              type="submit"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>

      {post.caption && (
        <p className="mt-3 text-slate-700 dark:text-slate-300">{post.caption}</p>
      )}

      <div className="mt-4">
        <ReactionBar
          postId={post.id}
          counts={post.reaction_counts ?? []}
          currentUserId={currentUserId}
        />
      </div>

      <hr className="my-6 border-slate-200 dark:border-slate-800" />

      <CommentSection
        postId={post.id}
        comments={post.comments ?? []}
        currentUserId={currentUserId}
      />
    </motion.div>
  )
}
