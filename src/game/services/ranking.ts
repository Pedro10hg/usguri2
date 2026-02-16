import { createClient } from '@/lib/supabase/client'

export interface RankingEntry {
  id: string
  name: string
  score: number
  level: number
  created_at: string
}

export async function getTop10(): Promise<RankingEntry[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ranking')
    .select('id, name, score, level, created_at')
    .order('score', { ascending: false })
    .limit(10)

  if (error) {
    console.error('getTop10 error:', error.message)
    return []
  }
  return data ?? []
}

export async function saveScore(
  name: string,
  score: number,
  level: number,
): Promise<boolean> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { error } = await supabase.from('ranking').insert({
    user_id: user.id,
    name,
    score,
    level,
  })

  if (error) {
    console.error('saveScore error:', error.message)
    return false
  }
  return true
}

export async function getCurrentUser(): Promise<{
  id: string
  displayName: string | null
} | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    displayName: data?.display_name ?? null,
  }
}
