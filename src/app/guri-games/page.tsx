'use client'

import { motion } from 'framer-motion'
import { Gamepad2, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'

export default function GuriGamesPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-guri-green-500/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-guri-blue-500/15 blur-3xl" />
      </div>

      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
        >
          <h1 className="select-none bg-gradient-to-br from-guri-green-400 via-guri-green-500 to-guri-blue-500 bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent sm:text-[14rem] md:text-[18rem]">
            GG
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative -mt-6 sm:-mt-10"
        >
          <div className="inline-flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-guri-green-500" />
            <h2 className="text-2xl font-bold sm:text-3xl">Guri Games</h2>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-600 dark:text-slate-400">
            A plataforma de jogos do grupo dos Guri. Mini-games, desafios e
            muita diversão feita por nós, pra nós.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-guri-green-500 to-guri-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            <Sparkles className="h-4 w-4" /> Projeto Carro-Chefe
          </span>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-400 dark:border-slate-700"
          >
            <Gamepad2 className="h-4 w-4" /> Em Breve
          </button>
        </motion.div>
      </Container>
    </section>
  )
}
