'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn, UserPlus, Mail, Lock, AlertCircle, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { login, signup } from './actions'

const errorMessages: Record<string, string> = {
  credentials: 'Email ou senha incorretos.',
  signup: 'Erro ao criar conta. Tente novamente.',
  auth: 'Erro na autenticação. Tente novamente.',
}

export function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const success = searchParams.get('success')
  const next = searchParams.get('next') || '/'
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {isSignUp
                ? 'Crie sua conta pra fazer parte do grupo.'
                : 'Acesse sua conta do Site dos Guri.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessages[error] || 'Ocorreu um erro.'}
            </div>
          )}

          {success === 'check-email' && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-guri-green-200 bg-guri-green-50 p-4 text-sm text-guri-green-700 dark:border-guri-green-800 dark:bg-guri-green-950 dark:text-guri-green-300">
              <Check className="h-4 w-4 shrink-0" />
              Conta criada! Verifique seu email para confirmar.
            </div>
          )}

          <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <input type="hidden" name="next" value={next} />
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-colors focus:border-guri-green-500 focus:outline-none focus:ring-1 focus:ring-guri-green-500 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <button
              formAction={isSignUp ? signup : login}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-guri-green-600 hover:shadow-md"
            >
              {isSignUp ? (
                <>
                  <UserPlus className="h-4 w-4" /> Criar Conta
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Entrar
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-guri-green-600 hover:text-guri-green-500 dark:text-guri-green-400"
            >
              {isSignUp ? 'Entrar' : 'Criar conta'}
            </button>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
