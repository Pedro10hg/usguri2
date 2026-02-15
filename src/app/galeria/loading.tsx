import { Container } from '@/components/ui/Container'

export default function GaleriaLoading() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="h-8 w-44 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="aspect-square w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
