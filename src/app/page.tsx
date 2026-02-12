import { Hero } from '@/components/Hero'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { Card } from '@/components/ui/Card'
import { Code2, Users, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Código Limpo',
    description:
      'Praticamos as melhores práticas de desenvolvimento e revisão de código.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description:
      'Colaboração e troca de conhecimento entre os membros do grupo.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description:
      'Projetos com tecnologias modernas e abordagens criativas.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20">
        <Container>
          <SectionHeading
            title="O que nos move"
            subtitle="Somos um grupo dedicado a construir, aprender e evoluir juntos."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <AnimatedCard key={feature.title} index={i}>
                <Card>
                  <feature.icon className="mb-4 h-10 w-10 text-brand-500" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
