import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ProjectCard'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { getProjects } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Projetos desenvolvidos pela comunidade Site dos Guri.',
}

export const revalidate = 300

export default async function ProjetosPage() {
  const projects = await getProjects()

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Nossos Projetos"
          subtitle="O que estamos construindo juntos."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimatedCard key={project.id} index={i}>
              <ProjectCard project={project} />
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
