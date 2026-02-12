export interface Member {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  techStack: string[]
  repoUrl?: string
  liveUrl?: string
  members: string[]
}
