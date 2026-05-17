import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArticlesDropdown from '@/components/ArticlesDropdown';

export const metadata = {
  title: 'Sobre mí — Iciar Ochoa',
  description: 'Pintora especializada en acuarela. Iciar Ochoa captura la luz y la atmósfera del Mediterráneo.',
};

const EXPOSICIONES = [
  { year: '2026', venue: 'La Hacienda',       location: 'Mutilva' },
  { year: '2025', venue: 'Âme & Art',         location: 'Ciudadela Pamplona' },
  { year: '2025', venue: 'Centro SIC',         location: 'c/ Leyre' },
  { year: '2025', venue: 'Cafetería Leiho',    location: 'c/ Javier' },
  { year: '2024', venue: 'Nuevo Casino Iruña', location: 'Plaza del Castillo' },
];

function ExpoRow({ year, venue, location, last }) {
  return (
    <div style={{
      padding: '12px 0',
      borderBottom: last ? 'none' : '1px solid #C4BAB0',
    }}>
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(16px, 1.6vw, 22px)',
        fontStyle: 'italic',
        color: '#7E6B5A',
        display: 'block',
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {year}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(12px, 1vw, 14px)',
        fontWeight: 500,
        color: '#2D2D2D',
        display: 'block',
      }}>
        {venue}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '10px',
        color: '#7E6B5A',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        {location}
      </span>
    </div>
  );
}

export default function SobreMiPage() {
  return (
    <>
      <Nav />
      <main style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        paddingTop: '84px',
        minHeight: '100vh',
      }}>

        {/* TOP-LEFT — Sobre mí text box */}
        <div style={{
          background: '#D4CCBE',
          padding: '40px 40px',
          borderBottom: '1px solid #D1CDC4',
          borderRight: '1px solid #D1CDC4',
        }}>
          <span style={labelStyle}>Sobre mí</span>
          <p style={bodyStyle}>
            Siempre he sabido que mi forma de expresarme pasa por la pintura. Desde muy joven, los pinceles y la creatividad me han atraído de forma especial. Empecé explorando la técnica del óleo, con el tiempo llegaron el acrílico y la acuarela.
          </p>
          <p style={{ ...bodyStyle, marginTop: '16px' }}>
            Hoy, uniendo mi trayectoria artística con mi pasión por la decoración, he encontrado mi sello personal: crear obras que van más allá del lienzo, entendiendo cada pintura como una pieza decorativa única y lista para hacer de tu rincón preferido un espacio elegante, acogedor y único.
          </p>
        </div>

        {/* TOP-RIGHT — Stats + articles dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #D1CDC4' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}>
            {[
              { value: '+15',  desc: 'Años de trayectoria' },
              { value: '+200', desc: 'Obras' },
              { value: '5',    desc: 'Exposiciones' },
            ].map(({ value, desc }, i) => (
              <div
                key={desc}
                style={{
                  padding: '24px 32px',
                  borderRight: i < 2 ? '1px solid #D1CDC4' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(36px, 4vw, 60px)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#2D2D2D',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  {value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: '#7E6B5A',
                }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>
          <ArticlesDropdown />
        </div>

        {/* BOTTOM-LEFT — Portrait image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '60vh',
          borderRight: '1px solid #D1CDC4',
        }}>
          <img
            src="/images/portada.jpeg"
            alt="Iciar Ochoa"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              position: 'absolute',
              inset: 0,
            }}
          />
        </div>

        {/* BOTTOM-RIGHT — Special qualities + Exposiciones */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Special qualities */}
          <div style={{
            background: '#D4CCBE',
            padding: '40px 40px',
            borderBottom: '1px solid #D1CDC4',
          }}>
            <span style={labelStyle}>¿Qué hace especial una obra de Iciar Ochoa?</span>
            <p style={{ ...bodyStyle, marginBottom: '16px' }}>
              En mis piezas no solo encontrarás los pigmentos del óleo, acrílico o acuarela. En los montajes, me gusta integrar elementos que aporten calidez y un punto diferenciador:
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Texturas',               desc: 'Que crean juegos de luces y sombras que cambiarán su visión con las distintas luces del día y la noche.' },
                { title: 'Tejidos de lino',         desc: 'Que aportan calidez y elegancia.' },
                { title: 'Cuerdas y fibras naturales', desc: 'Que aportan un toque artesanal y orgánico.' },
                { title: 'Maderas seleccionadas',   desc: 'Marcos que abrazan la obra y la elevan para dar un toque de distinción.' },
              ].map(({ title, desc }) => (
                <li key={title} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                  <span style={{ color: '#7E6B5A', flexShrink: 0 }}>•</span>
                  <p style={{ ...bodyStyle, margin: 0 }}>
                    <strong style={{ fontStyle: 'normal', fontWeight: 600, fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {title}:
                    </strong>{' '}
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Exposiciones box — gap above */}
          <div style={{
            background: '#D4CCBE',
            padding: '32px 40px',
            margin: '16px 0 0',
            flexGrow: 1,
          }}>
            <span style={labelStyle}>Exposiciones</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>

              {/* Left col — 3 entries */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {EXPOSICIONES.slice(0, 3).map(({ year, venue, location }, i) => (
                  <ExpoRow key={i} year={year} venue={venue} location={location} last={i === 2} />
                ))}
              </div>

              {/* Right col — 2 entries */}
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #D1CDC4', paddingLeft: '32px' }}>
                {EXPOSICIONES.slice(3).map(({ year, venue, location }, i) => (
                  <ExpoRow key={i} year={year} venue={venue} location={location} last={i === 1} />
                ))}
              </div>

            </div>
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: '#2D2D2D',
  display: 'block',
  marginBottom: '14px',
};

const bodyStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(12px, 1vw, 14px)',
  lineHeight: 1.8,
  color: '#2D2D2D',
  margin: 0,
};
