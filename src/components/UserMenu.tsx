'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import { LogIn, LogOut, User as UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/app/login/actions'

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <LogIn className="h-4 w-4" />
        Entrar
      </Link>
    )
  }

  const initials = (user.email ?? 'U').slice(0, 2).toUpperCase()

  return (
    <div className="group relative">
      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-guri-green-500 text-xs font-bold text-white">
        {initials}
      </button>
      <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <form action={logout}>
            <button className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950">
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
