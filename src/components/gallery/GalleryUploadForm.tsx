'use client'

import { useState, useRef } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { createGalleryPost } from '@/app/galeria/actions'

export function GalleryUploadForm() {
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`

      const { error } = await supabase.storage
        .from('gallery')
        .upload(fileName, file, { upsert: true })

      if (error) throw error
      setImageUrl(`gallery/${fileName}`)
    } catch {
      setPreview(null)
      setImageUrl('')
    } finally {
      setUploading(false)
    }
  }

  function handleClear() {
    setPreview(null)
    setImageUrl('')
    if (inputRef.current) inputRef.current.value = ''
  }

  if (!open) {
    return (
      <div className="mb-8 text-center">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-guri-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-guri-green-600"
        >
          <ImagePlus className="h-4 w-4" />
          Postar Foto
        </button>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <form action={createGalleryPost} className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Nova Foto</h3>
          <button type="button" onClick={() => { setOpen(false); handleClear() }} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <input type="hidden" name="image_url" value={imageUrl} />

        {preview ? (
          <div className="relative mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full rounded-xl object-cover" />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-12 text-slate-500 transition-colors hover:border-guri-green-500 hover:text-guri-green-500 dark:border-slate-600 dark:text-slate-400"
          >
            <ImagePlus className="h-6 w-6" />
            <span>Escolher foto</span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <textarea
          name="caption"
          placeholder="Legenda (opcional)"
          rows={2}
          className="mb-4 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-guri-green-500 focus:ring-1 focus:ring-guri-green-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={!imageUrl || uploading}
          className="w-full rounded-xl bg-guri-green-500 py-3 text-sm font-medium text-white transition-colors hover:bg-guri-green-600 disabled:opacity-50"
        >
          {uploading ? 'Enviando...' : 'Publicar'}
        </button>
      </form>
    </div>
  )
}
