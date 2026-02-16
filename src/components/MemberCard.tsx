import Link from 'next/link'
import { Instagram, Linkedin, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Profile } from '@/types'

export function MemberCard({ profile }: { profile: Profile }) {
  const avatarSrc = profile.avatar_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profile.avatar_url}`
    : null
  const initials = (profile.display_name ?? profile.username ?? '?')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="text-center">
      {avatarSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={avatarSrc}
          alt={profile.display_name ?? 'Avatar'}
          width={80}
          height={80}
          className="mx-auto rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-guri-green-500 text-2xl font-bold text-white">
          {initials}
        </div>
      )}
      <h3 className="mt-4 text-lg font-semibold">
        {profile.display_name ?? profile.username ?? 'Sem nome'}
      </h3>
      {profile.username && (
        <Link
          href={`/perfil/${profile.username}`}
          className="text-sm text-guri-green-500 hover:underline"
        >
          @{profile.username}
        </Link>
      )}
      {profile.bio && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {profile.bio}
        </p>
      )}
      <div className="mt-4 flex justify-center gap-3">
        {profile.instagram_url && (
          <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {profile.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {profile.website_url && (
          <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Globe className="h-5 w-5" />
          </a>
        )}
      </div>
    </Card>
  )
}
