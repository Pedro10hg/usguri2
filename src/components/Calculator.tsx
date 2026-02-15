'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Calculator as CalcIcon, RotateCcw } from 'lucide-react'

interface Disciplina {
  id: number
  nome: string
  nota: string
  peso: string
}

type Status = 'aprovado' | 'recuperacao' | 'reprovado'

function getStatus(media: number): Status {
  if (media >= 7) return 'aprovado'
  if (media >= 4) return 'recuperacao'
  return 'reprovado'
}

const statusConfig: Record<Status, { label: string; subtitle: string; card: string; text: string }> = {
  aprovado: {
    label: 'Aprovado!',
    subtitle: 'Nota mínima para aprovação direta: 7.0',
    card: 'border-guri-green-200 bg-guri-green-50 dark:border-guri-green-800 dark:bg-guri-green-950',
    text: 'text-guri-green-600 dark:text-guri-green-400',
  },
  recuperacao: {
    label: 'Recuperação (A2)',
    subtitle: 'Total Recuperação — média entre 4.0 e 6.9',
    card: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
    text: 'text-yellow-600 dark:text-yellow-400',
  },
  reprovado: {
    label: 'Reprovado',
    subtitle: 'Média abaixo de 4.0',
    card: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
    text: 'text-red-600 dark:text-red-400',
  },
}

export function Calculator() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    { id: 1, nome: '', nota: '', peso: '1' },
    { id: 2, nome: '', nota: '', peso: '1' },
  ])
  const [resultado, setResultado] = useState<{
    media: number
    status: Status
  } | null>(null)
  const [nextId, setNextId] = useState(3)

  function adicionarDisciplina() {
    setDisciplinas([
      ...disciplinas,
      { id: nextId, nome: '', nota: '', peso: '1' },
    ])
    setNextId(nextId + 1)
  }

  function removerDisciplina(id: number) {
    if (disciplinas.length <= 1) return
    setDisciplinas(disciplinas.filter((d) => d.id !== id))
  }

  function atualizarDisciplina(
    id: number,
    campo: keyof Omit<Disciplina, 'id'>,
    valor: string,
  ) {
    setDisciplinas(
      disciplinas.map((d) => (d.id === id ? { ...d, [campo]: valor } : d)),
    )
    setResultado(null)
  }

  function calcular() {
    let somaProdutos = 0
    let somaPesos = 0

    for (const d of disciplinas) {
      const nota = parseFloat(d.nota)
      const peso = parseFloat(d.peso)
      if (isNaN(nota) || isNaN(peso) || peso <= 0) continue
      somaProdutos += nota * peso
      somaPesos += peso
    }

    if (somaPesos === 0) return

    const media = somaProdutos / somaPesos
    setResultado({ media, status: getStatus(media) })
  }

  function limpar() {
    setDisciplinas([
      { id: 1, nome: '', nota: '', peso: '1' },
      { id: 2, nome: '', nota: '', peso: '1' },
    ])
    setNextId(3)
    setResultado(null)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-3">
          {disciplinas.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <input
                type="text"
                placeholder={`Disciplina ${i + 1}`}
                value={d.nome}
                onChange={(e) =>
                  atualizarDisciplina(d.id, 'nome', e.target.value)
                }
                className="w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 sm:w-auto sm:flex-1 dark:border-slate-700"
              />
              <input
                type="number"
                placeholder="Nota"
                min="0"
                max="10"
                step="0.1"
                value={d.nota}
                onChange={(e) =>
                  atualizarDisciplina(d.id, 'nota', e.target.value)
                }
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 sm:w-20 sm:flex-none dark:border-slate-700"
              />
              <input
                type="number"
                placeholder="Peso"
                min="0.1"
                step="0.1"
                value={d.peso}
                onChange={(e) =>
                  atualizarDisciplina(d.id, 'peso', e.target.value)
                }
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 sm:w-20 sm:flex-none dark:border-slate-700"
              />
              <button
                onClick={() => removerDisciplina(d.id)}
                disabled={disciplinas.length <= 1}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:text-red-500 disabled:opacity-30"
                aria-label="Remover disciplina"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={adicionarDisciplina}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition-colors hover:border-guri-green-500 hover:text-guri-green-500 dark:border-slate-600"
          >
            <Plus className="h-4 w-4" /> Adicionar disciplina
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={calcular}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-guri-green-600 hover:shadow-md"
          >
            <CalcIcon className="h-4 w-4" /> Calcular média
          </button>
          <button
            onClick={limpar}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" /> Limpar
          </button>
        </div>
      </div>

      <AnimatePresence>
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`mt-6 rounded-2xl border p-6 text-center ${statusConfig[resultado.status].card}`}
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Média Ponderada
            </p>
            <p
              className={`mt-1 text-5xl font-bold ${statusConfig[resultado.status].text}`}
            >
              {resultado.media.toFixed(2)}
            </p>
            <p
              className={`mt-2 text-lg font-semibold ${statusConfig[resultado.status].text}`}
            >
              {statusConfig[resultado.status].label}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {statusConfig[resultado.status].subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
