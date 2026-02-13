export interface Member {
  id: string
  name: string
  role: string
  bio: string | null
  avatar_url: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  display_order: number
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  tech_stack: string[]
  repo_url: string | null
  live_url: string | null
  display_order: number
  created_at: string
  members?: Member[]
}

export interface Product {
  id: string
  name: string
  description: string
  image_url: string | null
  sizes: string[]
  colors: string[]
  whatsapp_url: string | null
  is_active: boolean
  display_order: number
  created_at: string
}

export interface Momento {
  id: string
  title: string
  description: string
  image_url: string | null
  icon_name: string
  display_order: number
  created_at: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon_name: string
  color: string
  display_order: number
  created_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  role: string
  created_at: string
  updated_at: string
}
