export default function Prayer({ titulo, texto }) {
  return (
    <section id="oracion" className="section-padding max-w-3xl mx-auto">
      <div className="gold-divider" />

      <div className="glass-card text-center max-w-2xl mx-auto">
        <h2 className="font-script text-3xl text-cta mb-6">{titulo}</h2>
        <p className="font-serif italic text-text-muted text-lg leading-relaxed">
          {texto}
        </p>
      </div>
    </section>
  )
}
