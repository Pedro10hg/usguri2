'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { resolveStorageUrl } from '@/lib/supabase'
import type { Profile } from '@/types'

export function UserSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Profile[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url')
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(10)
      setResults((data as Profile[]) ?? [])
      setOpen(true)
      setLoading(false)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="relative mx-auto mb-8 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar guri por nome ou @username..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm focus:border-guri-green-500 focus:ring-1 focus:ring-guri-green-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {loading ? (
            <div className="px-4 py-3 text-center text-sm text-slate-500">Buscando...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-center text-sm text-slate-500">
              Nenhum guri encontrado.
            </div>
          ) : (
            <div className="py-1">
              {results.map((profile) => {
                const avatarUrl = resolveStorageUrl(profile.avatar_url)
                return (
                  <Link
                    key={profile.id}
                    href={`/perfil/${profile.username ?? ''}`}
                    onClick={() => { setOpen(false); setQuery('') }}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-guri-green-500 text-xs font-bold text-white">
                        {(profile.display_name ?? profile.username ?? '?')
                          .slice(0, 1)
                          .toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {profile.display_name ?? `@${profile.username}`}
                      </p>
                      {profile.username && (
                        <p className="truncate text-xs text-slate-500">@{profile.username}</p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
