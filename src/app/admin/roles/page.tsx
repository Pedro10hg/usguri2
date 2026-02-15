import { getProjects } from '@/lib/queries'
import { Card } from '@/components/ui/Card'
import { createProject, updateProject, deleteProject } from '../actions'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminRolesPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Rolês</h2>
      </div>

      <Card className="mb-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-500">Adicionar Rolê</h3>
        <form action={createProject} className="grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Título" required className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="tags" placeholder="Tags (separadas por vírgula)" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <textarea name="description" placeholder="Descrição" required rows={2} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm sm:col-span-2 dark:border-slate-700 dark:bg-slate-800" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-guri-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-guri-green-600 sm:col-span-2">
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{project.title}</p>
              <p className="mt-1 text-sm text-slate-500">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-guri-green-50 px-2 py-0.5 text-xs text-guri-green-700 dark:bg-guri-green-950 dark:text-guri-green-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <form action={updateProject} className="contents">
                <input type="hidden" name="id" value={project.id} />
                <input name="title" defaultValue={project.title} className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <input name="description" defaultValue={project.description} className="hidden" />
                <input name="tags" defaultValue={project.tags.join(', ')} className="w-28 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <button type="submit" className="rounded-lg bg-guri-blue-500 p-2 text-white hover:bg-guri-blue-600">
                  <Pencil className="h-3 w-3" />
                </button>
              </form>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
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
