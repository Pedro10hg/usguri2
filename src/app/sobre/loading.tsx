import { Container } from '@/components/ui/Container'

export default function SobreLoading() {
  return (
    <>
      <section className="py-20">
        <Container>
          <div className="mb-12 flex flex-col items-center gap-3">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-80 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1">
                    <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="mb-12 flex flex-col items-center gap-3">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
