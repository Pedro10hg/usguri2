export interface Member {
  id: string
  name: string
  role: string
  bio: string | null
  avatar_url: string | null
  instagram_url: string | null
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
  tags: string[]
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
  username: string | null
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  role: string
  created_at: string
  updated_at: string
}

export interface GalleryPost {
  id: string
  user_id: string
  image_url: string
  caption: string | null
  created_at: string
  profile?: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
  reactions?: GalleryReaction[]
  comments?: GalleryComment[]
  reaction_counts?: ReactionCount[]
  comment_count?: number
}

export interface GalleryReaction {
  id: string
  post_id: string
  user_id: string
  reaction_type: 'like' | 'love' | 'fire'
  created_at: string
  profile?: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
}

export interface GalleryComment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profile?: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
}

export interface ReactionCount {
  reaction_type: 'like' | 'love' | 'fire'
  count: number
}
