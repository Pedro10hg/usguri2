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

const NOTA_MINIMA = 6.0

export function Calculator() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    { id: 1, nome: '', nota: '', peso: '1' },
    { id: 2, nome: '', nota: '', peso: '1' },
  ])
  const [resultado, setResultado] = useState<{
    media: number
    aprovado: boolean
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
    setResultado({ media, aprovado: media >= NOTA_MINIMA })
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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-3">
          {disciplinas.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder={`Disciplina ${i + 1}`}
                value={d.nome}
                onChange={(e) =>
                  atualizarDisciplina(d.id, 'nome', e.target.value)
                }
                className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 dark:border-slate-700"
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
                className="w-20 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 dark:border-slate-700"
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
                className="w-20 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-guri-green-500 dark:border-slate-700"
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

        <div className="mt-6 flex gap-3">
          <button
            onClick={calcular}
            className="inline-flex items-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-guri-green-600 hover:shadow-md"
          >
            <CalcIcon className="h-4 w-4" /> Calcular média
          </button>
          <button
            onClick={limpar}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
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
            className={`mt-6 rounded-2xl border p-6 text-center ${
              resultado.aprovado
                ? 'border-guri-green-200 bg-guri-green-50 dark:border-guri-green-800 dark:bg-guri-green-950'
                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
            }`}
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Média Ponderada
            </p>
            <p
              className={`mt-1 text-5xl font-bold ${
                resultado.aprovado
                  ? 'text-guri-green-600 dark:text-guri-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {resultado.media.toFixed(2)}
            </p>
            <p
              className={`mt-2 text-lg font-semibold ${
                resultado.aprovado
                  ? 'text-guri-green-600 dark:text-guri-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {resultado.aprovado ? 'Aprovado!' : 'Reprovado'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Nota mínima para aprovação: {NOTA_MINIMA.toFixed(1)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
