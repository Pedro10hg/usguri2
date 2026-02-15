import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { getGalleryPost } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { GalleryDetail } from '@/components/gallery/GalleryDetail'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getGalleryPost(id)
  return {
    title: post
      ? `Foto de ${post.profile?.display_name ?? 'Guri'} — Galeria`
      : 'Foto não encontrada',
  }
}

export default async function GalleryPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const post = await getGalleryPost(id)

  if (!post) notFound()

  return (
    <section className="py-20">
      <Container>
        <GalleryDetail post={post} currentUserId={user?.id ?? null} />
      </Container>
    </section>
  )
}
