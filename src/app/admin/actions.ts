'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')
  return supabase
}

// ---- MEMBROS (Featured Profiles) ----

export async function toggleFeatured(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const featured = formData.get('featured') === 'true'
  const { error } = await supabase
    .from('profiles')
    .update({ featured: !featured })
    .eq('id', id)
  if (error) redirect('/admin/membros?error=toggle')
  revalidatePath('/admin/membros')
  revalidatePath('/sobre')
  redirect('/admin/membros')
}

export async function updateFeaturedOrder(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const order = parseInt(formData.get('featured_order') as string, 10) || 0
  const { error } = await supabase
    .from('profiles')
    .update({ featured_order: order })
    .eq('id', id)
  if (error) redirect('/admin/membros?error=order')
  revalidatePath('/admin/membros')
  revalidatePath('/sobre')
  redirect('/admin/membros')
}

// ---- PROJECTS (Rolês) ----

export async function createProject(formData: FormData) {
  const supabase = await requireAdmin()
  const tags = (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean)
  const { error } = await supabase.from('projects').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tags,
  })
  if (error) redirect('/admin/roles?error=create')
  revalidatePath('/admin/roles')
  revalidatePath('/projetos')
  redirect('/admin/roles?success=created')
}

export async function updateProject(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const tags = (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean)
  const { error } = await supabase.from('projects').update({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tags,
  }).eq('id', id)
  if (error) redirect('/admin/roles?error=update')
  revalidatePath('/admin/roles')
  revalidatePath('/projetos')
  redirect('/admin/roles?success=updated')
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/roles')
  revalidatePath('/projetos')
  redirect('/admin/roles')
}

// ---- PRODUCTS ----

export async function createProduct(formData: FormData) {
  const supabase = await requireAdmin()
  const sizes = (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean)
  const colors = (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean)
  const { error } = await supabase.from('products').insert({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    sizes,
    colors,
    whatsapp_url: (formData.get('whatsapp_url') as string) || null,
  })
  if (error) redirect('/admin/produtos?error=create')
  revalidatePath('/admin/produtos')
  revalidatePath('/servicos')
  redirect('/admin/produtos?success=created')
}

export async function updateProduct(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const sizes = (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean)
  const colors = (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean)
  const { error } = await supabase.from('products').update({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    sizes,
    colors,
    whatsapp_url: (formData.get('whatsapp_url') as string) || null,
    is_active: formData.get('is_active') === 'on',
  }).eq('id', id)
  if (error) redirect('/admin/produtos?error=update')
  revalidatePath('/admin/produtos')
  revalidatePath('/servicos')
  redirect('/admin/produtos?success=updated')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/produtos')
  revalidatePath('/servicos')
  redirect('/admin/produtos')
}

// ---- MOMENTOS ----

export async function createMomento(formData: FormData) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('momentos').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: (formData.get('icon_name') as string) || 'Camera',
  })
  if (error) redirect('/admin/momentos?error=create')
  revalidatePath('/admin/momentos')
  revalidatePath('/sobre')
  redirect('/admin/momentos?success=created')
}

export async function updateMomento(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const { error } = await supabase.from('momentos').update({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: (formData.get('icon_name') as string) || 'Camera',
  }).eq('id', id)
  if (error) redirect('/admin/momentos?error=update')
  revalidatePath('/admin/momentos')
  revalidatePath('/sobre')
  redirect('/admin/momentos?success=updated')
}

export async function deleteMomento(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  await supabase.from('momentos').delete().eq('id', id)
  revalidatePath('/admin/momentos')
  revalidatePath('/sobre')
  redirect('/admin/momentos')
}

// ---- FEATURES ----

export async function createFeature(formData: FormData) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('features').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: (formData.get('icon_name') as string) || 'Users',
    color: (formData.get('color') as string) || 'text-guri-green-500',
  })
  if (error) redirect('/admin/features?error=create')
  revalidatePath('/admin/features')
  revalidatePath('/')
  redirect('/admin/features?success=created')
}

export async function updateFeature(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  const { error } = await supabase.from('features').update({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    icon_name: (formData.get('icon_name') as string) || 'Users',
    color: (formData.get('color') as string) || 'text-guri-green-500',
  }).eq('id', id)
  if (error) redirect('/admin/features?error=update')
  revalidatePath('/admin/features')
  revalidatePath('/')
  redirect('/admin/features?success=updated')
}

export async function deleteFeature(formData: FormData) {
  const supabase = await requireAdmin()
  const id = formData.get('id') as string
  await supabase.from('features').delete().eq('id', id)
  revalidatePath('/admin/features')
  revalidatePath('/')
  redirect('/admin/features')
}
