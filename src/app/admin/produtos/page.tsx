import { getProducts } from '@/lib/queries'
import { Card } from '@/components/ui/Card'
import { createProduct, updateProduct, deleteProduct } from '../actions'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminProdutosPage() {
  // Buscar todos os produtos (incluindo inativos) para o admin
  const products = await getProducts()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Produtos</h2>
      </div>

      <Card className="mb-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-500">Adicionar Produto</h3>
        <form action={createProduct} className="grid gap-3 sm:grid-cols-2">
          <input name="name" placeholder="Nome" required className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="whatsapp_url" placeholder="WhatsApp URL" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <textarea name="description" placeholder="Descrição" required rows={2} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm sm:col-span-2 dark:border-slate-700 dark:bg-slate-800" />
          <input name="sizes" placeholder="Tamanhos (P, M, G, GG)" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="colors" placeholder="Cores (Preta, Branca)" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-guri-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-guri-green-600 sm:col-span-2">
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </form>
      </Card>

      <div className="space-y-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-slate-500">{product.description}</p>
              <p className="mt-1 text-xs text-slate-400">
                Tamanhos: {product.sizes.join(', ')} | Cores: {product.colors.join(', ')}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <form action={updateProduct} className="contents">
                <input type="hidden" name="id" value={product.id} />
                <input name="name" defaultValue={product.name} className="hidden" />
                <input name="description" defaultValue={product.description} className="hidden" />
                <input name="sizes" defaultValue={product.sizes.join(', ')} className="hidden" />
                <input name="colors" defaultValue={product.colors.join(', ')} className="hidden" />
                <input name="whatsapp_url" defaultValue={product.whatsapp_url ?? ''} className="hidden" />
                <label className="flex items-center gap-1 text-xs">
                  <input type="checkbox" name="is_active" defaultChecked={product.is_active} />
                  Ativo
                </label>
                <button type="submit" className="rounded-lg bg-guri-blue-500 p-2 text-white hover:bg-guri-blue-600">
                  <Pencil className="h-3 w-3" />
                </button>
              </form>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button type="submit" className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600">
                  <Trash2 className="h-3 w-3" />
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
