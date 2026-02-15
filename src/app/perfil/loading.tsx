import { Container } from '@/components/ui/Container'

export default function PerfilLoading() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="h-8 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="mb-1.5 h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </Container>
    </section>
  )
}
