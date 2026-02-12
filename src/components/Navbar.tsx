'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Gamepad2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre Nós' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/ferramentas', label: 'Ferramentas' },
  { href: '/projetos', label: 'Projetos' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isGamesActive = pathname === '/guri-games'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Code2 className="h-6 w-6 text-guri-green-500" />
            <span>
              Site dos <span className="text-guri-green-500">Guri</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-guri-green-50 text-guri-green-600 dark:bg-guri-green-950 dark:text-guri-green-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/guri-games"
              className={`ml-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                isGamesActive
                  ? 'bg-gradient-to-r from-guri-green-500 to-guri-blue-500 text-white shadow-md'
                  : 'bg-gradient-to-r from-guri-green-500 to-guri-blue-500 bg-clip-text text-transparent hover:opacity-80'
              }`}
            >
              <Gamepad2
                className={`h-4 w-4 ${isGamesActive ? 'text-white' : 'text-guri-green-500'}`}
              />
              GG
              <span className="rounded-full bg-guri-green-100 px-1.5 py-0.5 text-[10px] font-bold text-guri-green-700 dark:bg-guri-green-900 dark:text-guri-green-300">
                EM BREVE
              </span>
            </Link>

            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-guri-green-50 text-guri-green-600 dark:bg-guri-green-950 dark:text-guri-green-400'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/guri-games"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                >
                  <Gamepad2 className="h-4 w-4 text-guri-green-500" />
                  <span className="bg-gradient-to-r from-guri-green-500 to-guri-blue-500 bg-clip-text text-transparent">
                    Guri Games
                  </span>
                  <span className="rounded-full bg-guri-green-100 px-1.5 py-0.5 text-[10px] font-bold text-guri-green-700 dark:bg-guri-green-900 dark:text-guri-green-300">
                    EM BREVE
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
