'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createGalleryPost(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/galeria')

  const image_url = formData.get('image_url') as string
  const caption = (formData.get('caption') as string) || null

  if (!image_url) redirect('/galeria?error=no-image')

  const { error } = await supabase.from('gallery_posts').insert({
    user_id: user.id,
    image_url,
    caption,
  })

  if (error) redirect('/galeria?error=create')
  revalidatePath('/galeria')
  redirect('/galeria?success=posted')
}

export async function deleteGalleryPost(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const id = formData.get('id') as string
  await supabase.from('gallery_posts').delete().eq('id', id).eq('user_id', user.id)
  revalidatePath('/galeria')
  redirect('/galeria')
}

export async function toggleReaction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const post_id = formData.get('post_id') as string
  const reaction_type = formData.get('reaction_type') as string

  const { data: existing } = await supabase
    .from('gallery_reactions')
    .select('id')
    .eq('post_id', post_id)
    .eq('user_id', user.id)
    .eq('reaction_type', reaction_type)
    .single()

  if (existing) {
    await supabase.from('gallery_reactions').delete().eq('id', existing.id)
  } else {
    await supabase.from('gallery_reactions').insert({
      post_id,
      user_id: user.id,
      reaction_type,
    })
  }

  revalidatePath('/galeria')
}

export async function addComment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const post_id = formData.get('post_id') as string
  const content = (formData.get('content') as string)?.trim()

  if (!content) return

  await supabase.from('gallery_comments').insert({
    post_id,
    user_id: user.id,
    content,
  })

  revalidatePath('/galeria')
}

export async function deleteComment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const id = formData.get('id') as string
  await supabase.from('gallery_comments').delete().eq('id', id).eq('user_id', user.id)
  revalidatePath('/galeria')
}
