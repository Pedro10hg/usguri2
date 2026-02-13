import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProfile } from '@/lib/queries'
import { ProfileForm } from './profile-form'

export const metadata: Metadata = {
  title: 'Meu Perfil',
  description: 'Gerencie seu perfil no Site dos Guri.',
}

export default async function PerfilPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/perfil')
  }

  const profile = await getProfile(user.id)

  if (!profile) {
    redirect('/login?error=auth')
  }

  return <ProfileForm profile={profile} email={user.email ?? ''} />
}
