import { Heart } from 'lucide-react'

export default function Footer({ padres, padrinos, copyright }) {
  return (
    <footer className="bg-surface border-t border-cta/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Padres */}
        {padres && padres.length > 0 && (
          <div>
            <p className="text-text-muted text-sm tracking-wide uppercase">Padres</p>
            <p className="text-text font-semibold text-lg">{padres.join(' & ')}</p>
          </div>
        )}

        {/* Padrinos */}
        {padrinos && padrinos.length > 0 && (
          <div>
            <p className="text-text-muted text-sm tracking-wide uppercase">Padrinos</p>
            <p className="text-text font-semibold text-lg">{padrinos.join(' & ')}</p>
          </div>
        )}

        {/* Divider with heart */}
        <div className="flex items-center justify-center gap-3 text-cta/40">
          <div className="h-px w-12 bg-cta/20" />
          <Heart size={16} className="text-cta" />
          <div className="h-px w-12 bg-cta/20" />
        </div>

        <p className="text-text-muted text-sm">{copyright}</p>
      </div>
    </footer>
  )
}
