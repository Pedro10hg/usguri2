import { getMembers } from '@/lib/queries'
import { Card } from '@/components/ui/Card'
import { createMember, updateMember, deleteMember } from '../actions'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminMembrosPage() {
  const members = await getMembers()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Membros</h2>
      </div>

      <Card className="mb-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-500">Adicionar Membro</h3>
        <form action={createMember} className="grid gap-3 sm:grid-cols-2">
          <input name="name" placeholder="Nome" required className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="role" placeholder="Papel (ex: Fundador)" required className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="bio" placeholder="Bio" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="instagram_url" placeholder="Instagram URL" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-guri-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-guri-green-600 sm:col-span-2">
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {members.map((member) => (
          <Card key={member.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-guri-green-500">{member.role}</p>
              {member.bio && <p className="mt-1 text-sm text-slate-500">{member.bio}</p>}
            </div>
            <div className="flex gap-2">
              <form action={updateMember} className="contents">
                <input type="hidden" name="id" value={member.id} />
                <input name="name" defaultValue={member.name} className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <input name="role" defaultValue={member.role} className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800" />
                <input type="hidden" name="bio" value={member.bio ?? ''} />
                <input type="hidden" name="instagram_url" value={member.instagram_url ?? ''} />
                <button type="submit" className="rounded-lg bg-guri-blue-500 p-2 text-white hover:bg-guri-blue-600">
                  <Pencil className="h-3 w-3" />
                </button>
              </form>
              <form action={deleteMember}>
                <input type="hidden" name="id" value={member.id} />
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
