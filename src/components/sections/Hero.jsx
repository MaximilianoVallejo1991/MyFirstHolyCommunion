import { useRef, useState, useEffect } from 'react'

// ponytail: parse "15 de Diciembre, 2026" → valid Date
const parseDate = (str) => {
  const months = { enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06', julio:'07', agosto:'08', septiembre:'09', octubre:'10', noviembre:'11', diciembre:'12' }
  const m = str.toLowerCase().match(/(\d+)\s+de\s+(\w+)\s*,?\s*(\d{4})/)
  return m ? new Date(`${m[3]}-${months[m[2]]}-${m[1]}`) : null
}

export default function Hero({ nombre, apellido, fotoPrincipal, frase, fraseFuente, fecha }) {
  const [daysLeft, setDaysLeft] = useState(null)
  const timerRef = useRef(null)

  // ponytail: vanilla countdown — cheap, zero deps
  useEffect(() => {
    const target = parseDate(fecha)
    if (!target) return
    const tick = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setDaysLeft(0)
        if (timerRef.current) clearInterval(timerRef.current)
        return
      }
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }
    tick()
    timerRef.current = setInterval(tick, 60000)
    return () => clearInterval(timerRef.current)
  }, [fecha])

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center section-padding pt-24 text-center bg-gradient-to-b from-background to-cta/[0.03]"
    >
      {/* Photo */}
      <div className="mb-8">
        {fotoPrincipal ? (
          <img
            src={fotoPrincipal}
            alt={`${nombre} ${apellido}`}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover ring-4 ring-cta/40 shadow-lg cursor-default"
          />
        ) : (
          /* ponytail: CSS fallback when no photo */
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-cta/10 ring-4 ring-cta/20 flex items-center justify-center cursor-default">
            <span className="font-script text-5xl text-cta/40">
              {nombre.charAt(0)}{apellido.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* ponytail: subtitle */}
      <p className="font-script text-3xl sm:text-4xl text-cta mb-2">
        Mi Primera Comunión
      </p>

      {/* Name */}
      <h1 className="font-script text-5xl sm:text-6xl lg:text-7xl text-text mb-3">
        {nombre}
      </h1>
      <p className="font-serif text-2xl sm:text-3xl text-cta mb-6">{apellido}</p>

      {/* Date */}
      <p className="font-serif text-xl text-text-muted mb-4">{fecha}</p>

      {/* Countdown */}
      {daysLeft !== null && (
        <div className="mb-8">
          {daysLeft > 0 ? (
            <p className="text-sm text-text-muted tracking-wide">
              Faltan{' '}
              <span className="text-cta font-bold text-lg">{daysLeft}</span>{' '}
              {daysLeft === 1 ? 'día' : 'días'}
            </p>
          ) : (
            <p className="text-cta font-script text-2xl">¡El día ha llegado!</p>
          )}
        </div>
      )}

      {/* Verse */}
      <blockquote className="max-w-lg mx-auto mt-4">
        <p className="font-serif italic text-text-muted text-lg leading-relaxed">
          «{frase}»
        </p>
        <footer className="mt-2 text-sm text-text-muted/70">
          — {fraseFuente}
        </footer>
      </blockquote>
    </section>
  )
}
