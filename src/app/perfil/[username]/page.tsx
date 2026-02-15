import type { Metadata } from 'next'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Globe, UserX } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { getProfileByUsername } from '@/lib/queries'
import { resolveStorageUrl } from '@/lib/queries'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const profile = await getProfileByUsername(username)
  return {
    title: profile
      ? `${profile.display_name ?? `@${profile.username}`} — Site dos Guri`
      : 'Perfil não encontrado',
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params
  const profile = await getProfileByUsername(username)

  if (!profile) {
    return (
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <UserX className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" />
            <h1 className="mt-4 text-2xl font-bold">Perfil não encontrado</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              O usuário <span className="font-medium">@{username}</span> não existe.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-guri-green-600"
            >
              Voltar ao início
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  const avatarUrl = resolveStorageUrl(profile.avatar_url)

  const socialLinks = [
    { url: profile.instagram_url, icon: Instagram, label: 'Instagram' },
    { url: profile.linkedin_url, icon: Linkedin, label: 'LinkedIn' },
    { url: profile.twitter_url, icon: Twitter, label: 'Twitter' },
    { url: profile.website_url, icon: Globe, label: 'Website' },
  ].filter((l) => l.url)

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-md text-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={profile.display_name ?? `@${profile.username}`}
              className="mx-auto h-28 w-28 rounded-full border-4 border-guri-green-500 object-cover"
            />
          ) : (
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-guri-green-500 text-3xl font-bold text-white">
              {(profile.display_name ?? profile.username ?? '?')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <h1 className="mt-4 text-2xl font-bold">
            {profile.display_name ?? `@${profile.username}`}
          </h1>
          {profile.username && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              @{profile.username}
            </p>
          )}

          {profile.bio && (
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {profile.bio}
            </p>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-6 flex justify-center gap-4">
              {socialLinks.map(({ url, icon: Icon, label }) => (
                <a
                  key={label}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-guri-green-500 hover:text-guri-green-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-guri-green-500 dark:hover:text-guri-green-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
