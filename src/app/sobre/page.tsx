import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { MemberCard } from '@/components/MemberCard'
import { getMembers, getMomentos, resolveStorageUrl } from '@/lib/queries'
import { getIcon } from '@/lib/icons'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história e os membros do grupo dos Guri.',
}

export const revalidate = 300

export default async function SobrePage() {
  const [members, momentos] = await Promise.all([getMembers(), getMomentos()])

  return (
    <>
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Nossa História"
            subtitle="Os momentos que fizeram o grupo ser o que é hoje."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {momentos.map((momento, i) => {
              const Icon = getIcon(momento.icon_name)
              const imageUrl = resolveStorageUrl(momento.image_url)
              return (
                <AnimatedCard key={momento.id} index={i}>
                  <Card className="overflow-hidden">
                    {imageUrl && (
                      <div className="-m-6 mb-4 h-40 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={momento.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-guri-green-50 p-3 dark:bg-guri-green-950">
                        <Icon className="h-6 w-6 text-guri-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{momento.title}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {momento.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            title="Os Guri"
            subtitle="O time por trás dos projetos e da resenha."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <AnimatedCard key={member.id} index={i}>
                <MemberCard member={member} />
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
