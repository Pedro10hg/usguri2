export function getStorageUrl(bucket: string, path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${path}`
}

export function resolveStorageUrl(path: string | null): string {
  if (!path) return ''
  const slashIndex = path.indexOf('/')
  if (slashIndex === -1) return path
  const bucket = path.substring(0, slashIndex)
  const file = path.substring(slashIndex + 1)
  return getStorageUrl(bucket, file)
}
