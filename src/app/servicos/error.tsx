'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Container } from '@/components/ui/Container'

export default function ServicosError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[50vh] items-center py-20">
      <Container className="text-center">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold">Erro ao carregar serviços</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
          Não foi possível carregar os produtos. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-guri-green-600"
        >
          <RefreshCw className="h-4 w-4" /> Tentar novamente
        </button>
      </Container>
    </section>
  )
}
