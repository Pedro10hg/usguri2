import { createClient } from '@/lib/supabase/server'
import type { Member, Project, Product, Momento, Feature, Profile, GalleryPost, ReactionCount } from '@/types'

// Re-export para manter compatibilidade com imports existentes
export { resolveStorageUrl } from '@/lib/supabase'

export async function getMembers(): Promise<Member[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('display_order')
    if (error) { console.error('getMembers error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getMembers exception:', e); return [] }
}

export async function getFeaturedProfiles(): Promise<Profile[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('featured', true)
      .order('featured_order')
    if (error) { console.error('getFeaturedProfiles error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getFeaturedProfiles exception:', e); return [] }
}

export async function getAllProfiles(): Promise<Profile[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) { console.error('getAllProfiles error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getAllProfiles exception:', e); return [] }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_members (
          member_id,
          members (*)
        )
      `)
      .order('display_order')
    if (error) { console.error('getProjects error:', error.message); return [] }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data ?? []).map((p: any) => ({
      ...p,
      members: p.project_members?.map((pm: any) => pm.members) ?? [],
    }))
  } catch (e) { console.error('getProjects exception:', e); return [] }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    if (error) { console.error('getProducts error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getProducts exception:', e); return [] }
}

export async function getMomentos(): Promise<Momento[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('momentos')
      .select('*')
      .order('display_order')
    if (error) { console.error('getMomentos error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getMomentos exception:', e); return [] }
}

export async function getFeatures(): Promise<Feature[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .order('display_order')
    if (error) { console.error('getFeatures error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('getFeatures exception:', e); return [] }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
  if (error) return null
  return data
}

// --- GALLERY ---

function aggregateReactions(reactions: { reaction_type: string }[]): ReactionCount[] {
  const map: Record<string, number> = {}
  for (const r of reactions) {
    map[r.reaction_type] = (map[r.reaction_type] || 0) + 1
  }
  return Object.entries(map).map(([reaction_type, count]) => ({
    reaction_type: reaction_type as ReactionCount['reaction_type'],
    count,
  }))
}

export async function getGalleryPosts(): Promise<GalleryPost[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery_posts')
      .select(`
        *,
        profiles:user_id (id, username, display_name, avatar_url),
        gallery_reactions (reaction_type),
        gallery_comments (id)
      `)
      .order('created_at', { ascending: false })
    if (error) { console.error('getGalleryPosts error:', error.message); return [] }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data ?? []).map((p: any) => ({
      id: p.id,
      user_id: p.user_id,
      image_url: p.image_url,
      caption: p.caption,
      created_at: p.created_at,
      profile: p.profiles,
      reaction_counts: aggregateReactions(p.gallery_reactions ?? []),
      comment_count: (p.gallery_comments ?? []).length,
    }))
  } catch (e) { console.error('getGalleryPosts exception:', e); return [] }
}

export async function getGalleryPost(postId: string): Promise<GalleryPost | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery_posts')
      .select(`
        *,
        profiles:user_id (id, username, display_name, avatar_url),
        gallery_reactions (id, user_id, reaction_type, created_at, profiles:user_id (id, username, display_name, avatar_url)),
        gallery_comments (id, user_id, content, created_at, profiles:user_id (id, username, display_name, avatar_url))
      `)
      .eq('id', postId)
      .single()
    if (error) { console.error('getGalleryPost error:', error.message); return null }
    return {
      id: data.id,
      user_id: data.user_id,
      image_url: data.image_url,
      caption: data.caption,
      created_at: data.created_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profile: (data as any).profiles,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reactions: ((data as any).gallery_reactions ?? []).map((r: any) => ({ ...r, profile: r.profiles })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      comments: ((data as any).gallery_comments ?? [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => ({ ...c, profile: c.profiles }))
        .sort((a: { created_at: string }, b: { created_at: string }) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reaction_counts: aggregateReactions((data as any).gallery_reactions ?? []),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      comment_count: ((data as any).gallery_comments ?? []).length,
    }
  } catch (e) { console.error('getGalleryPost exception:', e); return null }
}

export async function searchProfiles(query: string): Promise<Profile[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
      .limit(20)
    if (error) { console.error('searchProfiles error:', error.message); return [] }
    return data ?? []
  } catch (e) { console.error('searchProfiles exception:', e); return [] }
}
