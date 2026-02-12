'use client' // Necessário para usar animações do Framer Motion

import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Rocket className="mx-auto mb-4 h-16 w-16 text-blue-500" />
        <h1 className="text-5xl font-bold tracking-tight">
          Site dos <span className="text-blue-500">Guri</span>
        </h1>
        <p className="mt-4 text-slate-400">
          A nova era começou. Código limpo e ferramentas de ponta.
        </p>
      </motion.div>
    </main>
  )
}