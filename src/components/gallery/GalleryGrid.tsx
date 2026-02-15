'use client'

import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { GalleryPostCard } from './GalleryPostCard'
import type { GalleryPost } from '@/types'

interface Props {
  posts: GalleryPost[]
  currentUserId: string | null
}

export function GalleryGrid({ posts, currentUserId }: Props) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-slate-500 dark:text-slate-400">
        Nenhuma foto por enquanto. Seja o primeiro a postar!
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <AnimatedCard key={post.id} index={i}>
          <GalleryPostCard post={post} currentUserId={currentUserId} />
        </AnimatedCard>
      ))}
    </div>
  )
}
