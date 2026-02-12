'use client'

import { motion } from 'framer-motion'
import { Rocket, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-guri-green-500/10 blur-3xl" />
        <div className="absolute right-1/3 top-20 h-[400px] w-[500px] translate-x-1/2 rounded-full bg-guri-blue-500/10 blur-3xl" />
      </div>

      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Rocket className="mx-auto mb-6 h-16 w-16 text-guri-green-500" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Site dos{' '}
            <span className="bg-gradient-to-r from-guri-green-500 to-guri-blue-500 bg-clip-text text-transparent">
              Guri
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Um grupo de alunos apaixonados por tecnologia, resenha e
            colaboração. Código limpo, ideias grandes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/membros">
            Conheça o time <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/projetos" variant="secondary">
            Ver projetos
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
