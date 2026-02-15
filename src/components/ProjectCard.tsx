import { ExternalLink } from 'lucide-react'
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
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-guri-green-50 px-3 py-1 text-xs font-medium text-guri-green-700 dark:bg-guri-green-950 dark:text-guri-green-300">
            {tag}
          </span>
        ))}
      </div>
      {project.live_url && (
        <div className="mt-4">
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-guri-blue-500">
            <ExternalLink className="h-4 w-4" /> Ver mais
          </a>
        </div>
      )}
    </Card>
  )
}
