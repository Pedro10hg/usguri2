import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getGalleryPosts } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { GalleryUploadForm } from '@/components/gallery/GalleryUploadForm'
import { UserSearch } from '@/components/UserSearch'

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Fotos e momentos dos Guri.',
}

export const revalidate = 60

export default async function GaleriaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const posts = await getGalleryPosts()

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Galeria dos Guri"
          subtitle="Momentos, fotos e resenhas do grupo."
        />
        <UserSearch />
        {user && <GalleryUploadForm />}
        <GalleryGrid posts={posts} currentUserId={user?.id ?? null} />
      </Container>
    </section>
  )
}
