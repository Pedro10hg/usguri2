import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Container } from '@/components/ui/Container'
import { Users, MapPin, Shirt, Camera, Lightbulb, LayoutDashboard } from 'lucide-react'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/membros', label: 'Membros', icon: Users },
  { href: '/admin/roles', label: 'Rolês', icon: MapPin },
  { href: '/admin/produtos', label: 'Produtos', icon: Shirt },
  { href: '/admin/momentos', label: 'Momentos', icon: Camera },
  { href: '/admin/features', label: 'Features', icon: Lightbulb },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/admin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  return (
    <section className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Gerencie o conteúdo do site.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <nav className="flex shrink-0 gap-2 overflow-x-auto lg:w-48 lg:flex-col">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-guri-green-50 hover:text-guri-green-600 dark:text-slate-400 dark:hover:bg-guri-green-950 dark:hover:text-guri-green-400"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </section>
  )
}
