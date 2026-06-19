import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function Bendicion({ frase, mensaje, transferencia }) {
  const { banco, alias, cbu, titular } = transferencia
  const [copied, setCopied] = useState(null)

  // ponytail: clipboard.writeText, zero deps
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(field)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // ponytail: clipboard may fail in insecure contexts, silently ignore
    }
  }

  return (
    <section id="bendicion" className="section-padding max-w-3xl mx-auto">
      <div className="gold-divider" />

      <h2 className="font-script text-4xl text-center text-cta mb-6">
        Bendición
      </h2>

      <p className="text-center font-serif italic text-text-muted text-lg mb-8">
        {frase}
      </p>

      <p className="text-center text-text-muted text-sm mb-6">{mensaje}</p>

      {/* Transfer details */}
      <div className="glass-card max-w-md mx-auto">
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-cta/10">
            <span className="text-text-muted text-sm">Banco</span>
            <span className="text-text font-semibold">{banco}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-cta/10">
            <span className="text-text-muted text-sm">Titular</span>
            <span className="text-text font-semibold">{titular}</span>
          </div>

          {/* Alias — copyable */}
          <div className="flex justify-between items-center py-2 border-b border-cta/10">
            <span className="text-text-muted text-sm">Alias</span>
            <button
              onClick={() => handleCopy(alias, 'alias')}
              className="copyable flex items-center gap-2 text-text font-semibold focus-visible:ring-3 focus-visible:ring-cta rounded"
            >
              {alias}
              {copied === 'alias' ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-text-muted/60" />
              )}
            </button>
          </div>

          {/* CBU — copyable */}
          <div className="flex justify-between items-center py-2">
            <span className="text-text-muted text-sm">CBU</span>
            <button
              onClick={() => handleCopy(cbu, 'cbu')}
              className="copyable flex items-center gap-2 text-text font-mono text-sm focus-visible:ring-3 focus-visible:ring-cta rounded"
            >
              {cbu}
              {copied === 'cbu' ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} className="text-text-muted/60" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
