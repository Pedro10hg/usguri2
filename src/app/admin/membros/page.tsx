import { getAllProfiles } from '@/lib/queries'
import { Card } from '@/components/ui/Card'
import { toggleFeatured, updateFeaturedOrder } from '../actions'
import { Star, ArrowUpDown } from 'lucide-react'

export default async function AdminMembrosPage() {
  const profiles = await getAllProfiles()
  const featured = profiles.filter((p) => p.featured).sort((a, b) => a.featured_order - b.featured_order)
  const notFeatured = profiles.filter((p) => !p.featured)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Membros</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Selecione quais guris aparecem na página &quot;Sobre Nós&quot; e defina a ordem.
        </p>
      </div>

      {featured.length > 0 && (
        <>
          <h3 className="mb-3 text-sm font-semibold text-guri-green-600 dark:text-guri-green-400">
            Aparecendo no site ({featured.length})
          </h3>
          <div className="mb-8 space-y-3">
            {featured.map((profile) => (
              <Card key={profile.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 shrink-0 fill-guri-green-500 text-guri-green-500" />
                  <div>
                    <p className="font-semibold">
                      {profile.display_name ?? profile.username ?? 'Sem nome'}
                    </p>
                    {profile.username && (
                      <p className="text-sm text-slate-500">@{profile.username}</p>
                    )}
                    {!profile.username && (
                      <p className="text-xs text-slate-400">{profile.id.slice(0, 8)}...</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <form action={updateFeaturedOrder} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={profile.id} />
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    <input
                      name="featured_order"
                      type="number"
                      defaultValue={profile.featured_order}
                      className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs dark:border-slate-700 dark:bg-slate-800"
                    />
                    <button type="submit" className="rounded-lg bg-guri-blue-500 px-2 py-1 text-xs text-white hover:bg-guri-blue-600">
                      Salvar
                    </button>
                  </form>
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={profile.id} />
                    <input type="hidden" name="featured" value="true" />
                    <button type="submit" className="rounded-lg bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600">
                      Remover
                    </button>
                  </form>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <h3 className="mb-3 text-sm font-semibold text-slate-500">
        Todos os usuários ({notFeatured.length})
      </h3>
      <div className="space-y-3">
        {notFeatured.length === 0 && (
          <p className="text-sm text-slate-400">Todos os usuários já estão selecionados.</p>
        )}
        {notFeatured.map((profile) => (
          <Card key={profile.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-600" />
              <div>
                <p className="font-semibold">
                  {profile.display_name ?? profile.username ?? 'Sem nome'}
                </p>
                {profile.username && (
                  <p className="text-sm text-slate-500">@{profile.username}</p>
                )}
                {!profile.username && (
                  <p className="text-xs text-slate-400">{profile.id.slice(0, 8)}...</p>
                )}
              </div>
            </div>
            <form action={toggleFeatured}>
              <input type="hidden" name="id" value={profile.id} />
              <input type="hidden" name="featured" value="false" />
              <button type="submit" className="rounded-lg bg-guri-green-500 px-3 py-1 text-xs font-medium text-white hover:bg-guri-green-600">
                Adicionar
              </button>
            </form>
          </Card>
        ))}
      </div>
    </div>
  )
}
