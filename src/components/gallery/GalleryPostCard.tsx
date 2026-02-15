'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { resolveStorageUrl } from '@/lib/supabase'
import { ReactionBar } from './ReactionBar'
import type { GalleryPost } from '@/types'

interface Props {
  post: GalleryPost
  currentUserId: string | null
}

export function GalleryPostCard({ post, currentUserId }: Props) {
  const imageUrl = resolveStorageUrl(post.image_url)
  const avatarUrl = resolveStorageUrl(post.profile?.avatar_url ?? null)

  return (
    <Card className="overflow-hidden p-0">
      <Link href={`/galeria/${post.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={post.caption ?? 'Foto'}
          className="aspect-square w-full object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-guri-green-500 text-xs font-bold text-white">
              {(post.profile?.display_name ?? '?').slice(0, 1).toUpperCase()}
            </div>
          )}
          <Link
            href={`/perfil/${post.profile?.username ?? ''}`}
            className="text-sm font-medium hover:underline"
          >
            {post.profile?.display_name ?? `@${post.profile?.username}`}
          </Link>
        </div>

        {post.caption && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {post.caption}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <ReactionBar
            postId={post.id}
            counts={post.reaction_counts ?? []}
            currentUserId={currentUserId}
          />
          <Link
            href={`/galeria/${post.id}`}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <MessageCircle className="h-4 w-4" />
            {post.comment_count ?? 0}
          </Link>
        </div>
      </div>
    </Card>
  )
}
