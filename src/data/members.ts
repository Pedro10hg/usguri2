import type { Member } from '@/types'

export const members: Member[] = [
  {
    id: '1',
    name: 'Pedro Henrique',
    role: 'Desenvolvedor Full Stack',
    bio: 'Apaixonado por tecnologia, código limpo e boas práticas de desenvolvimento.',
    avatarUrl: 'https://ui-avatars.com/api/?name=Pedro+Henrique&background=3b82f6&color=fff&size=160',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '2',
    name: 'Lucas Silva',
    role: 'Frontend Developer',
    bio: 'Especialista em interfaces modernas, animações e experiência do usuário.',
    avatarUrl: 'https://ui-avatars.com/api/?name=Lucas+Silva&background=8b5cf6&color=fff&size=160',
    socialLinks: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: '3',
    name: 'Gabriel Santos',
    role: 'Backend Developer',
    bio: 'Focado em APIs robustas, bancos de dados e arquitetura de sistemas.',
    avatarUrl: 'https://ui-avatars.com/api/?name=Gabriel+Santos&background=06b6d4&color=fff&size=160',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com',
    },
  },
  {
    id: '4',
    name: 'Matheus Oliveira',
    role: 'DevOps & Cloud',
    bio: 'Infraestrutura, CI/CD e automação para entregar software com qualidade.',
    avatarUrl: 'https://ui-avatars.com/api/?name=Matheus+Oliveira&background=f59e0b&color=fff&size=160',
    socialLinks: {
      github: 'https://github.com',
    },
  },
]
