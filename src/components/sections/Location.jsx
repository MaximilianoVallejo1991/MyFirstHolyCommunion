import { MapPin } from 'lucide-react'

export default function Location({ mapaEmbedUrl, direccion, iglesia }) {
  return (
    <section id="ubicacion" className="section-padding max-w-4xl mx-auto">
      <h2 className="font-script text-4xl text-center text-cta mb-10">
        Ubicación
      </h2>

      <div className="glass-card p-0 overflow-hidden">
        {mapaEmbedUrl ? (
          <iframe
            src={mapaEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa de ${iglesia}`}
            className="w-full"
          />
        ) : null}

        <div className="p-6 flex items-start gap-3">
          <MapPin size={20} className="text-cta mt-0.5 shrink-0 cursor-default" />
          <div>
            <p className="font-semibold text-text">{iglesia}</p>
            <p className="text-text-muted text-sm">{direccion}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
