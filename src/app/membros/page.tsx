import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MemberCard } from '@/components/MemberCard'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { members } from '@/data/members'

export const metadata: Metadata = {
  title: 'Membros',
  description: 'Conheça os membros da comunidade Site dos Guri.',
}

export default function MembrosPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Nossos Membros"
          subtitle="O time por trás dos projetos e ideias."
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
  )
}
