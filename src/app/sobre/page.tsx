import type { Metadata } from 'next'
import { Camera, PartyPopper, Coffee, Trophy } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { MemberCard } from '@/components/MemberCard'
import { members } from '@/data/members'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história e os membros do grupo dos Guri.',
}

const momentos = [
  {
    icon: PartyPopper,
    title: 'O começo de tudo',
    description:
      'Um grupo de alunos que se juntou pela paixão por tecnologia e pela resenha. O que era brincadeira virou coisa séria.',
  },
  {
    icon: Coffee,
    title: 'Madrugadas de código',
    description:
      'Noites viradas programando, tomando café e resolvendo bugs. Cada erro era uma risada e um aprendizado.',
  },
  {
    icon: Trophy,
    title: 'Primeiro projeto no ar',
    description:
      'A emoção de ver o primeiro projeto rodando. Do zero ao deploy, tudo feito pelo grupo.',
  },
  {
    icon: Camera,
    title: 'Resenhas épicas',
    description:
      'Nem só de código vive o Guri. Churrascos, jogos e muita resenha que fortalece a amizade.',
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Nossa História"
            subtitle="Os momentos que fizeram o grupo ser o que é hoje."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {momentos.map((momento, i) => (
              <AnimatedCard key={momento.title} index={i}>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-guri-green-50 p-3 dark:bg-guri-green-950">
                      <momento.icon className="h-6 w-6 text-guri-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {momento.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {momento.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            ))}
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
