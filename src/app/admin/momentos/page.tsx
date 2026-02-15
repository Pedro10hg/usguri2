import { getMomentos } from '@/lib/queries'
import { Card } from '@/components/ui/Card'
import { createMomento, updateMomento, deleteMomento } from '../actions'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminMomentosPage() {
  const momentos = await getMomentos()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Momentos</h2>
      </div>

      <Card className="mb-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-500">Adicionar Momento</h3>
        <form action={createMomento} className="grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Título" required className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="icon_name" placeholder="Ícone (Camera, PartyPopper, Coffee, Trophy)" defaultValue="Camera" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <textarea name="description" placeholder="Descrição" required rows={2} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm sm:col-span-2 dark:border-slate-700 dark:bg-slate-800" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-guri-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-guri-green-600 sm:col-span-2">
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {momentos.map((momento) => (
          <Card key={momento.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{momento.title}</p>
              <p className="mt-1 text-sm text-slate-500">{momento.description}</p>
              <p className="mt-1 text-xs text-slate-400">Ícone: {momento.icon_name}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <form action={updateMomento} className="contents">
                <input type="hidden" name="id" value={momento.id} />
                <input name="title" defaultValue={momento.title} className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <input name="description" defaultValue={momento.description} className="hidden" />
                <input name="icon_name" defaultValue={momento.icon_name} className="w-20 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <button type="submit" className="rounded-lg bg-guri-blue-500 p-2 text-white hover:bg-guri-blue-600">
                  <Pencil className="h-3 w-3" />
                </button>
              </form>
              <form action={deleteMomento}>
                <input type="hidden" name="id" value={momento.id} />
                <button type="submit" className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600">
                  <Trash2 className="h-3 w-3" />
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
