import { createClient } from '@/lib/supabase/server'
import { getStorageUrl } from '@/lib/supabase'
import type { Member, Project, Product, Momento, Feature, Profile } from '@/types'

export function resolveStorageUrl(path: string | null): string {
  if (!path) return ''
  const slashIndex = path.indexOf('/')
  if (slashIndex === -1) return path
  const bucket = path.substring(0, slashIndex)
  const file = path.substring(slashIndex + 1)
  return getStorageUrl(bucket, file)
}

export async function getMembers(): Promise<Member[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getProjects(): Promise<Project[]> {
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
  if (error) throw error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((p: any) => ({
    ...p,
    members: p.project_members?.map((pm: any) => pm.members) ?? [],
  }))
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getMomentos(): Promise<Momento[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('momentos')
    .select('*')
    .order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getFeatures(): Promise<Feature[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .order('display_order')
  if (error) throw error
  return data ?? []
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
