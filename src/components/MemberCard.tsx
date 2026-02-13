import { Github, Linkedin, Globe } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { resolveStorageUrl } from '@/lib/queries'
import type { Member } from '@/types'

export function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="text-center">
      <img
        src={resolveStorageUrl(member.avatar_url)}
        alt={member.name}
        width={80}
        height={80}
        className="mx-auto rounded-full"
      />
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-guri-green-500">{member.role}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {member.bio}
      </p>
      <div className="mt-4 flex justify-center gap-3">
        {member.github_url && (
          <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Github className="h-5 w-5" />
          </a>
        )}
        {member.linkedin_url && (
          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {member.website_url && (
          <a href={member.website_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-guri-blue-500">
            <Globe className="h-5 w-5" />
          </a>
        )}
      </div>
    </Card>
  )
}
