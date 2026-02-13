'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Globe,
  AlertCircle,
  Check,
  Save,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { updateProfile } from './actions'
import type { Profile } from '@/types'

interface ProfileFormProps {
  profile: Profile
  email: string
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const success = searchParams.get('success')

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {email}
            </p>
          </div>

          {error === 'update' && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Erro ao atualizar perfil. Tente novamente.
            </div>
          )}

          {success === 'updated' && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-guri-green-200 bg-guri-green-50 p-4 text-sm text-guri-green-700 dark:border-guri-green-800 dark:bg-guri-green-950 dark:text-guri-green-300">
              <Check className="h-4 w-4 shrink-0" />
              Perfil atualizado com sucesso!
            </div>
          )}

          <form
            action={updateProfile}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <label
                htmlFor="display_name"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="display_name"
                  name="display_name"
                  type="text"
                  defaultValue={profile.display_name ?? ''}
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Bio
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  defaultValue={profile.bio ?? ''}
                  placeholder="Conte um pouco sobre você"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="github_url"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                GitHub
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="github_url"
                  name="github_url"
                  type="url"
                  defaultValue={profile.github_url ?? ''}
                  placeholder="https://github.com/seu-user"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="linkedin_url"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                LinkedIn
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  defaultValue={profile.linkedin_url ?? ''}
                  placeholder="https://linkedin.com/in/seu-perfil"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="twitter_url"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Twitter / X
              </label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="twitter_url"
                  name="twitter_url"
                  type="url"
                  defaultValue={profile.twitter_url ?? ''}
                  placeholder="https://twitter.com/seu-user"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="website_url"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="website_url"
                  name="website_url"
                  type="url"
                  defaultValue={profile.website_url ?? ''}
                  placeholder="https://seusite.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-guri-green-600 hover:shadow-md"
            >
              <Save className="h-4 w-4" /> Salvar Alterações
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  )
}
