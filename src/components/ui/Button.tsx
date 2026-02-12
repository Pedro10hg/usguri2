import Link from 'next/link'

type ButtonProps = {
  href?: string
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200'
  const variants = {
    primary:
      'bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md',
    secondary:
      'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <button className={classes}>{children}</button>
}
