'use client'

import { useState, useRef } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface AvatarUploadProps {
  currentUrl: string | null
  onUpload: (url: string) => void
}

function toDisplayUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`
}

export function AvatarUpload({ currentUrl, onUpload }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(toDisplayUrl(currentUrl))
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`

      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      onUpload(`avatars/${fileName}`)
    } catch {
      setPreview(toDisplayUrl(currentUrl))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="group relative h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-slate-300 transition-colors hover:border-guri-green-500 dark:border-slate-600 dark:hover:border-guri-green-500"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
            <Camera className="h-8 w-8 text-slate-400" />
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <span className="text-xs text-slate-500">Clique para trocar a foto</span>
    </div>
  )
}
