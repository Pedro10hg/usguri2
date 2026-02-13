'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/perfil')
  }

  const updates = {
    display_name: (formData.get('display_name') as string) || null,
    bio: (formData.get('bio') as string) || null,
    github_url: (formData.get('github_url') as string) || null,
    linkedin_url: (formData.get('linkedin_url') as string) || null,
    twitter_url: (formData.get('twitter_url') as string) || null,
    website_url: (formData.get('website_url') as string) || null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    redirect('/perfil?error=update')
  }

  revalidatePath('/perfil')
  redirect('/perfil?success=updated')
}
