import { Container } from '@/components/ui/Container'

export default function ServicosLoading() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col justify-center gap-4">
              <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-10 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                ))}
              </div>
              <div className="mt-4 h-12 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
