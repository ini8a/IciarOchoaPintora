'use client';

import { useEffect, useRef } from 'react';
import Nav from '@/components/Nav';
import Link from 'next/link';

function SectionReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
    >
      {children}
    </div>
  );
}

const sectionLabel = {
  fontFamily: 'var(--font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.30em',
  textTransform: 'uppercase',
  color: '#7E6B5A',
  display: 'block',
  marginBottom: '12px',
};

const sectionHeading = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(26px, 3.2vw, 42px)',
  fontWeight: 400,
  color: '#2D2D2D',
  marginBottom: '56px',
};

export default function InfoPage() {
  return (
    <>
      <Nav />
      <main className="pt-36">

        {/* Back link */}
        <div className="px-16 mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#7E6B5A',
              textDecoration: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#2D2D2D'}
            onMouseLeave={e => e.currentTarget.style.color = '#7E6B5A'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver a la galería
          </Link>
        </div>

        {/* ENCARGOS */}
        <section id="encargos" className="px-16 py-20" style={{ maxWidth: '860px' }}>
          <SectionReveal>
            <span style={sectionLabel}>Encargos</span>
            <h2 style={sectionHeading}>Obra por encargo</h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px, 1.75vw, 22px)',
              lineHeight: 1.8,
              color: '#2D2D2D',
              marginBottom: '44px',
            }}>
              Si deseas encargar una obra personalizada — un retrato, un paisaje querido, un momento que no quieres olvidar — escríbeme. Trabajaré contigo desde el primer boceto hasta la obra terminada, para crear algo verdaderamente único.
            </p>
            <a
              href="#contacto"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#2D2D2D',
                border: '1px solid #2D2D2D',
                padding: '15px 34px',
                textDecoration: 'none',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2D2D2D'; e.currentTarget.style.color = '#F2EFE9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2D2D2D'; }}
            >
              Solicitar información
            </a>
          </SectionReveal>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" className="px-16 py-20" style={{ maxWidth: '820px' }}>
          <SectionReveal>
            <span style={sectionLabel}>Sobre mí</span>
            <h2 style={sectionHeading}>Iciar Ochoa</h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px, 1.75vw, 22px)',
              lineHeight: 1.85,
              color: '#2D2D2D',
            }}>
              Pintora especializada en acuarela, Iciar Ochoa captura la luz y la atmósfera del Mediterráneo con una sensibilidad única. Su obra, figurativa y llena de vida, nace de la observación directa del natural — jardines, figuras, paisajes bañados de sol. Formada en Bellas Artes, ha expuesto en galerías de Valencia, Madrid y Barcelona.
            </p>
          </SectionReveal>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="px-16 py-20 pb-32">
          <SectionReveal>
            <span style={sectionLabel}>Contacto</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '880px' }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: '#2D2D2D',
                  marginBottom: '44px',
                }}>
                  Me encantaría escucharte.
                </p>
                <a
                  href="mailto:hola@iciarochoa.com"
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#2D2D2D',
                    border: '1px solid #2D2D2D',
                    padding: '15px 34px',
                    textDecoration: 'none',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2D2D2D'; e.currentTarget.style.color = '#F2EFE9'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2D2D2D'; }}
                >
                  Escribir un mensaje
                </a>
              </div>
              <div style={{ paddingTop: '8px' }}>
                {[
                  ['Email',      <a key="e" href="mailto:hola@iciarochoa.com" style={{ color: '#2D2D2D', textDecoration: 'none', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>hola@iciarochoa.com</a>],
                  ['Teléfono',   <a key="t" href="tel:+34600123456" style={{ color: '#2D2D2D', textDecoration: 'none', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>+34 600 123 456</a>],
                  ['Ubicación',  <span key="u" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', color: '#2D2D2D' }}>Valencia, España</span>],
                  ['Instagram',  <a key="i" href="https://instagram.com/iciarochoa.arte" target="_blank" rel="noopener" style={{ color: '#2D2D2D', textDecoration: 'none', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>@iciarochoa.arte</a>],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline gap-4 py-4"
                    style={{
                      borderBottom: '1px solid #D1CDC4',
                      borderTop: i === 0 ? '1px solid #D1CDC4' : 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#7E6B5A',
                      flexShrink: 0,
                    }}>
                      {label}
                    </span>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      <footer className="flex justify-between items-center px-16 py-10" style={{ borderTop: '1px solid #D1CDC4' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic', color: '#7E6B5A' }}>
          Iciar Ochoa
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', color: '#D1CDC4' }}>
          © 2026 Iciar Ochoa. Todos los derechos reservados.
        </span>
      </footer>
    </>
  );
}
