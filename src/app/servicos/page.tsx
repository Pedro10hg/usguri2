import type { Metadata } from 'next'
import { Shirt, Ruler, Palette, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { Button } from '@/components/ui/Button'
import { getProducts, resolveStorageUrl } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Confira os serviços oferecidos pelo grupo dos Guri.',
}

export const revalidate = 300

export default async function ServicosPage() {
  const products = await getProducts()

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Nossos Serviços"
          subtitle="O que o grupo dos Guri tem pra oferecer."
        />

        {products.map((product) => (
          <AnimatedCard key={product.id}>
            <Card className="mx-auto max-w-3xl">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-guri-green-50 to-guri-blue-50 dark:from-guri-green-950 dark:to-guri-blue-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveStorageUrl(product.image_url)}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-guri-green-50 px-3 py-1 text-xs font-medium text-guri-green-700 dark:bg-guri-green-950 dark:text-guri-green-300">
                    <Shirt className="h-3 w-3" /> Produto oficial
                  </div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Ruler className="h-4 w-4" /> Tamanhos disponíveis
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((tam) => (
                        <span key={tam} className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium dark:border-slate-700">
                          {tam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Palette className="h-4 w-4" /> Cores: {product.colors.join(' e ')}
                    </div>
                  </div>

                  {product.whatsapp_url && (
                    <div className="mt-6">
                      <Button href={product.whatsapp_url} external>
                        <MessageCircle className="h-4 w-4" /> Encomendar via WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </AnimatedCard>
        ))}
      </Container>
    </section>
  )
}
