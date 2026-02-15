import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Users, MapPin, Shirt, Camera, Lightbulb } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()

  const [members, projects, products, momentos, features] = await Promise.all([
    supabase.from('members').select('id', { count: 'exact', head: true }),
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('momentos').select('id', { count: 'exact', head: true }),
    supabase.from('features').select('id', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Membros', count: members.count ?? 0, icon: Users, color: 'text-guri-green-500' },
    { label: 'Rolês', count: projects.count ?? 0, icon: MapPin, color: 'text-guri-blue-500' },
    { label: 'Produtos', count: products.count ?? 0, icon: Shirt, color: 'text-yellow-500' },
    { label: 'Momentos', count: momentos.count ?? 0, icon: Camera, color: 'text-purple-500' },
    { label: 'Features', count: features.count ?? 0, icon: Lightbulb, color: 'text-orange-500' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
