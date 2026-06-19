import { Church, GlassWater } from 'lucide-react'

const items = [
  { Icon: Church, label: 'Ceremonia' },
  { Icon: GlassWater, label: 'Recepción' },
]

export default function Schedule({ misaHora, misaIglesia, recepcionHora, recepcionLugar }) {
  const values = [
    { hora: misaHora, lugar: misaIglesia },
    { hora: recepcionHora, lugar: recepcionLugar },
  ]

  return (
    <section id="cronograma" className="section-padding max-w-3xl mx-auto">
      <h2 className="font-script text-4xl text-center text-cta mb-10">
        Cronograma
      </h2>

      {/* ponytail: vertical timeline, two nodes only */}
      <div className="relative border-l-2 border-cta/30 ml-4 sm:ml-8 pl-8 sm:pl-10 space-y-10">
        {items.map(({ Icon, label }, i) => (
          <div key={label} className="relative">
            {/* Node marker */}
            <div className="absolute -left-[2.35rem] sm:-left-[2.85rem] top-0 w-8 h-8 rounded-full bg-cta text-surface flex items-center justify-center shadow-md cursor-default">
              <Icon size={16} />
            </div>

            <h3 className="font-serif font-bold text-xl text-text mb-1">
              {values[i].hora} hs
            </h3>
            <p className="text-text-muted font-semibold">{label}</p>
            <p className="text-text-muted/80 text-sm">{values[i].lugar}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
