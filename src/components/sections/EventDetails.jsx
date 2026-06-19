import { Church, CalendarDays, Clock } from 'lucide-react'

const cards = [
  { Icon: Church, label: 'Iglesia' },
  { Icon: CalendarDays, label: 'Fecha' },
  { Icon: Clock, label: 'Hora' },
]

export default function EventDetails({ iglesia, direccion, fecha, hora }) {
  const values = [iglesia, fecha, hora]

  return (
    <section
      id="misa"
      className="section-padding max-w-6xl mx-auto"
    >
      <h2 className="font-script text-4xl text-center text-cta mb-10">
        Santa Misa
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map(({ Icon, label }, i) => (
          <div key={label} className="glass-card text-center">
            <Icon
              size={32}
              className="mx-auto mb-3 text-cta cursor-default"
            />
            <p className="text-sm text-text-muted tracking-wide uppercase mb-1">
              {label}
            </p>
            <p className="text-text font-semibold text-lg">{values[i]}</p>
            {i === 0 && (
              <p className="text-text-muted text-sm mt-1">{direccion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
