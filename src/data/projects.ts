import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Site dos Guri',
    description:
      'Website da comunidade, construído com as tecnologias mais modernas do ecossistema React.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    repoUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    members: ['1', '2'],
  },
  {
    id: '2',
    title: 'API de Gerenciamento',
    description:
      'API RESTful para gerenciamento de projetos e tarefas da comunidade com autenticação JWT.',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    repoUrl: 'https://github.com',
    members: ['3', '4'],
  },
  {
    id: '3',
    title: 'Bot Discord',
    description:
      'Bot para o servidor da comunidade com comandos personalizados, moderação e integrações.',
    techStack: ['Discord.js', 'TypeScript', 'Redis'],
    repoUrl: 'https://github.com',
    members: ['2', '3'],
  },
  {
    id: '4',
    title: 'Mobile App',
    description:
      'Aplicativo mobile da comunidade para acompanhar projetos e se conectar com os membros.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    members: ['1', '4'],
  },
]
