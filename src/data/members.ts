import type { Member } from '@/types'
import { getStorageUrl } from '@/lib/supabase'

export const members: Member[] = [
  {
    id: '1',
    name: 'Johnson',
    role: 'Administrador',
    bio: 'Rei do beat pegou a visão?',
    avatarUrl: getStorageUrl('avatars', 'pedro.jpg'),
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '2',
    name: 'GHJ',
    role: 'Administrador',
    bio: 'Fodase essa descrição.',
    avatarUrl: getStorageUrl('avatars', 'gabriel.jpg'),
    socialLinks: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: '3',
    name: 'THG',
    role: 'Administrador',
    bio: 'Fodase essa descrição.',
    avatarUrl: getStorageUrl('avatars', 'thalis.jpg'),
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com',
    },
  },
  {
    id: '4',
    name: 'Kaio Maconheiro',
    role: 'Criou essa merda',
    bio: 'Fodase.',
    avatarUrl: getStorageUrl('avatars', 'kaio.jpg'),
    socialLinks: {
      github: 'https://github.com',
    },
  },
]
