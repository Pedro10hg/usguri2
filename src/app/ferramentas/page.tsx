import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Calculator } from '@/components/Calculator'

export const metadata: Metadata = {
  title: 'Ferramentas',
  description:
    'Ferramentas úteis do grupo dos Guri. Calculadora de média ponderada.',
}

export default function FerramentasPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Calculadora de Média"
          subtitle="Adicione suas disciplinas com nota e peso para calcular a média ponderada."
        />
        <Calculator />
      </Container>
    </section>
  )
}
