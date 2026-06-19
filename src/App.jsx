import invitacion from './data/invitacion.json'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import EventDetails from './components/sections/EventDetails'
import Schedule from './components/sections/Schedule'
import Location from './components/sections/Location'
import Reception from './components/sections/Reception'
import Gallery from './components/sections/Gallery'
import Prayer from './components/sections/Prayer'
import Bendicion from './components/sections/Bendicion'
import Rsvp from './components/sections/Rsvp'

export default function App() {
  const { nino, evento, misa, recepcion, codigoVestimenta, oracion, bendicion, rsvp, familia, navegacion, footer } = invitacion

  return (
    <>
      <Navbar sections={navegacion} />

      <main>
        <Hero
          nombre={nino.nombre}
          apellido={nino.apellido}
          fotoPrincipal={nino.fotoPrincipal}
          frase={nino.frase}
          fraseFuente={nino.fraseFuente}
          fecha={evento.fecha}
        />

        <EventDetails
          iglesia={misa.iglesia}
          direccion={misa.direccion}
          fecha={evento.fecha}
          hora={evento.hora}
        />

        <Schedule
          misaHora={evento.hora}
          misaIglesia={misa.iglesia}
          recepcionHora={recepcion.hora}
          recepcionLugar={recepcion.lugar}
        />

        <Location
          mapaEmbedUrl={misa.mapaEmbedUrl}
          direccion={misa.direccion}
          iglesia={misa.iglesia}
        />

        <Reception
          lugar={recepcion.lugar}
          direccion={recepcion.direccion}
          hora={recepcion.hora}
          mapaEmbedUrl={recepcion.mapaEmbedUrl}
          codigoVestimenta={codigoVestimenta}
        />

        <Gallery imagenes={nino.galeria} />

        <Prayer titulo={oracion.titulo} texto={oracion.texto} />

        <Bendicion
          frase={bendicion.frase}
          mensaje={bendicion.mensaje}
          transferencia={bendicion.transferencia}
        />

        <Rsvp telefono={rsvp.telefono} mensaje={rsvp.mensaje} />
      </main>

      <Footer
        padres={familia.padres}
        padrinos={familia.padrinos}
        copyright={footer.copyright}
      />
    </>
  )
}
