import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ sections }) {
  const [open, setOpen] = useState(false)

  // ponytail: close mobile menu on link click
  const handleClick = () => setOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-cta/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ponytail: brand text, could be logo later */}
          <span className="font-script text-2xl text-cta cursor-default">
            MC
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="px-3 py-2 text-sm text-text-muted hover:text-cta rounded-md transition-colors duration-200 cursor-pointer"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-text-muted hover:text-cta transition-colors duration-200 cursor-pointer focus-visible:ring-3 focus-visible:ring-cta"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-cta/10 pt-2">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={handleClick}
                className="px-3 py-2 text-sm text-text-muted hover:text-cta rounded-md transition-colors duration-200 cursor-pointer"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
