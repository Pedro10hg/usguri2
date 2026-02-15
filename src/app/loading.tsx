import { Container } from '@/components/ui/Container'

export default function HomeLoading() {
  return (
    <>
      <section className="py-24 sm:py-32">
        <Container className="text-center">
          <div className="mx-auto flex flex-col items-center gap-6">
            <div className="h-16 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-12 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 w-96 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 flex gap-4">
              <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="mb-12 flex flex-col items-center gap-3">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <div className="mb-4 h-10 w-10 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
