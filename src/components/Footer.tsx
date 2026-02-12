import { Container } from '@/components/ui/Container'
import { Code2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Code2 className="h-4 w-4" />
            <span>&copy; {new Date().getFullYear()} Site dos Guri</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Feito com dedicação pela comunidade.
          </p>
        </div>
      </Container>
    </footer>
  )
}
