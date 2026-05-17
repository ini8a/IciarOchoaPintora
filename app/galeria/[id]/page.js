import { notFound } from 'next/navigation';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArtworkLightbox from '@/components/ArtworkLightbox';
import BackButton from '@/components/BackButton';
import { GALERIA } from '@/data/galeria';

export function generateStaticParams() {
  return GALERIA.map(a => ({ id: String(a.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const artwork = GALERIA.find(a => a.id === Number(id));
  if (!artwork) return {};
  return { title: `${artwork.title} — Iciar Ochoa` };
}

export default async function GaleriaArtworkPage({ params }) {
  const { id } = await params;
  const artwork = GALERIA.find(a => a.id === Number(id));
  if (!artwork) notFound();

  const { title, technique, dimensions, price, color, images } = artwork;
  const galleryImages = images.slice(1);

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '84px' }}>

        {/* ── Single viewport split ───────────────────── */}
        <div className="m-art-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: 'calc(100vh - 84px)',
        }}>

          {/* Left — main image, fills height */}
          <div className="m-art-img" style={{
            background: color,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {images[0] ? (
              <Image
                src={images[0]}
                alt={title}
                fill
                sizes="50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: 'rgba(45,45,45,0.3)',
                  textTransform: 'uppercase',
                }}>
                  Imagen próximamente
                </span>
              </div>
            )}
          </div>

          {/* Right — info panel, exact viewport height, no scroll */}
          <div className="m-art-info" style={{
            height: '100%',
            overflow: 'hidden',
            padding: '40px 56px 40px 52px',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Beige box — fills full height, contains everything */}
            <div className="m-art-box" style={{
              background: '#E8E2D9',
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
            }}>

              {/* Back button */}
              <BackButton label="Galería" />

              {/* Section label */}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#7E6B5A',
                display: 'block',
                marginBottom: '12px',
                flexShrink: 0,
              }}>
                Obra original
              </span>

              {/* Title */}
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.2vw, 52px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#2D2D2D',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 0 20px',
                flexShrink: 0,
              }}>
                {title}
              </h1>

              {/* Divider */}
              <div style={{ height: '1px', background: '#C4BAB0', marginBottom: '20px', flexShrink: 0 }} />

              {/* Meta rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={metaLabel}>Técnica</span>
                  <span style={metaValue}>{technique}</span>
                </div>
                <div style={{ height: '1px', background: '#C4BAB0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={metaLabel}>Medidas</span>
                  <span style={metaValue}>{dimensions}</span>
                </div>
                <div style={{ height: '1px', background: '#C4BAB0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={metaLabel}>Precio</span>
                  <strong style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(20px, 2.2vw, 32px)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: '#2D2D2D',
                  }}>
                    {price}
                  </strong>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#C4BAB0', marginBottom: '20px', flexShrink: 0 }} />

              {/* Más vistas + CTA square */}
              {galleryImages.length > 0 && (
                <div style={{ flexShrink: 0 }}>
                  <span style={{ ...metaLabel, display: 'block', marginBottom: '14px' }}>
                    Más vistas
                  </span>
                  <ArtworkLightbox images={galleryImages} title={title} />
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Footer spacer */}
        <div style={{ height: '80px' }} />

      </main>
      <Footer />
    </>
  );
}

const metaLabel = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#7E6B5A',
};

const metaValue = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.06em',
  color: '#2D2D2D',
};
