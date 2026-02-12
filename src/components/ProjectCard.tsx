import { ExternalLink, Github } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Project } from '@/types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <Github className="h-4 w-4" /> Código
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        )}
      </div>
    </Card>
  )
}
