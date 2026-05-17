import Nav from '@/components/Nav';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Encargos — Iciar Ochoa',
  description: 'Encarga una obra personalizada a Iciar Ochoa.',
};

const ENCARGOS = [
  { label: 'Mascotas',                   original: '/images/encargos/perroO.jpeg',    cuadro: '/images/encargos/perroC.jpeg' },
  { label: 'Aficiones · Sevillanas',     original: '/images/encargos/flamencaO.jpeg', cuadro: '/images/encargos/flamencaC.jpeg' },
  { label: 'Paisajes con nombre propio', original: '/images/encargos/playaO.jpeg',    cuadro: '/images/encargos/playaC.jpeg' },
  { label: 'Aficiones · Deportes',       original: '/images/encargos/padelO.jpeg',    cuadro: '/images/encargos/padelC.jpeg' },
  { label: 'Momentos para recordar',     original: '/images/encargos/ochoasO.jpeg',   cuadro: '/images/encargos/ochoasC.jpeg' },
  { label: 'Un lugar especial',          original: '/images/encargos/rioO.jpeg',      cuadro: '/images/encargos/rioC.jpeg' },
];

export default function EncargosPage() {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          animation: marqueeScroll 25s linear infinite reverse;
          will-change: transform;
          height: 100%;
        }
        .marquee-set {
          display: flex;
          gap: 6px;
          padding-right: 6px;
          flex-shrink: 0;
          height: 100%;
        }
      `}</style>

      <Nav />

      <main className="m-enc-main" style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '84px',
        gap: '20px',
        boxSizing: 'border-box',
      }}>

        {/* Content strip — compact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '32px',
          padding: '24px 56px',
          flex: 1,
        }} className="m-enc-strip">

          {/* Left text */}
          <div style={{ background: '#D4CCBE', padding: '32px 36px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#2D2D2D',
              display: 'block',
              marginBottom: '16px',
            }}>
              Obra por encargo para decorar tus espacios
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.8,
              color: '#2D2D2D',
              margin: 0,
            }}>
              Diseñamos juntos la pieza que completará tu hogar. Si tienes un espacio concreto, una medida o una paleta de colores en mente, crearé una obra en óleo, acrílico o técnica mixta pensada para convivir en armonía con tu decoración. Desde el lienzo hasta la enmarcación artesanal con linos y cuerdas, cuidaremos cada detalle.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/contacto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F2EFE9',
              background: '#2D2D2D',
              border: '1px solid #2D2D2D',
              padding: '16px 32px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Solicitar encargo
          </Link>

          {/* Right text */}
          <div style={{ textAlign: 'right', background: '#D4CCBE', padding: '32px 36px' }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#2D2D2D',
              display: 'block',
              marginBottom: '16px',
            }}>
              Acuarelas personalizadas: El regalo perfecto
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.8,
              color: '#2D2D2D',
              margin: 0,
            }}>
              Si buscas un detalle único y con mucho cariño, una acuarela personalizada a partir de una foto será la opción perfecta. Una bonita forma de inmortalizar un recuerdo, un lugar especial o un momento compartido — para un cumpleaños, boda, aniversario o comunión.
            </p>
          </div>

        </div>

        {/* Bottom scrolling row — takes all remaining height */}
        <div className="m-enc-marquee" style={{ overflow: 'hidden', flex: 1, minHeight: 0 }}>
          <div className="marquee-track">
            {[0, 1].map(setIdx => (
              <div key={setIdx} className="marquee-set">
                {ENCARGOS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      flexShrink: 0,
                      height: '100%',
                      aspectRatio: '4 / 3',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Image pair */}
                    <div style={{ display: 'flex', flex: 1, gap: '3px', minHeight: 0, overflow: 'hidden' }}>
                      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                        <Image
                          src={item.original}
                          alt={`${item.label} — original`}
                          fill
                          sizes="15vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                        <Image
                          src={item.cuadro}
                          alt={`${item.label} — cuadro`}
                          fill
                          sizes="15vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    {/* Label */}
                    <div style={{
                      flexShrink: 0,
                      background: '#D4CCBE',
                      padding: '8px 12px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.26em',
                        textTransform: 'uppercase',
                        color: '#7E6B5A',
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
