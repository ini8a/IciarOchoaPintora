'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = section?.parentElement;
    if (!section || !wrapper) return;

    // Slide the hero UP and fade it OUT as the user scrolls.
    // fromTo explicitly defines the start state so scrub can always reverse cleanly,
    // even if a previous killed tween left leftover inline styles on the element.
    const slideUp = gsap.fromTo(section,
      { yPercent: 0, opacity: 1 },
      {
        yPercent: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'center top',
          scrub: true,
        },
      }
    );

    const parallax = imageRef.current
      ? gsap.fromTo(imageRef.current,
          { yPercent: 0 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: 'center top',
              scrub: 1.5,
            },
          }
        )
      : null;

    const onScroll = () => setHintHidden(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      slideUp.kill();
      parallax?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex overflow-hidden"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'auto',
        backgroundImage: "url('/images/acuarela-bg.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient veil — dense left for legibility, fades right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(242,239,233,0.92) 0%, rgba(242,239,233,0.78) 42%, rgba(242,239,233,0.18) 100%)',
        }}
      />

      {/* Left — text. CSS animation instead of GSAP so it never conflicts with scroll tweens. */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          width: '52%',
          padding: '100px 56px 60px 72px',
          animation: 'heroTextIn 1s cubic-bezier(0.22,1,0.36,1) both 0.25s',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: '#7E6B5A',
          marginBottom: '28px',
          display: 'block',
        }}>
          Iciar Ochoa · Artista
        </span>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 4.5vw, 66px)',
          fontWeight: 400,
          color: '#2D2D2D',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          marginBottom: '36px',
        }}>
          Unión entre arte<br />y decoración
        </h1>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14px, 1.15vw, 17px)',
          lineHeight: 1.9,
          color: '#3A3A3A',
          marginBottom: '18px',
          maxWidth: '420px',
        }}>
          Entiendo cada cuadro como un objeto decorativo completo. Para mí, la obra va más allá del lienzo. El uso de materiales nobles como el lino y la cuerda, junto a una enmarcación muy pensada, definen el carácter final de la pieza.
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(14px, 1.15vw, 17px)',
          lineHeight: 1.9,
          color: '#3A3A3A',
          maxWidth: '420px',
        }}>
          Mis cuadros están diseñados con una mirada decorativa. Busco crear atmósferas elegantes y serenas, detalles únicos que harán de tus rincones elegidos, lugares acogedores, especiales y con personalidad propia.
        </p>
      </div>

      {/* Right — portrait */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ width: '48%', height: '100%' }}
      >
        <img
          ref={imageRef}
          src="/images/portada.jpeg"
          alt="Iciar Ochoa en su estudio"
          className="w-full block object-cover object-top"
          style={{ height: '115%', marginTop: '-5%' }}
        />
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{ width: '160px', background: 'linear-gradient(to right, rgba(242,239,233,0.78), transparent)' }}
        />
      </div>

      {/* Circular EXPLORAR button — centered at bottom */}
      <button
        onClick={() => window.lenis?.scrollTo('#oportunidades')}
        className="absolute transition-opacity duration-500"
        style={{
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          opacity: hintHidden ? 0 : 1,
          pointerEvents: hintHidden ? 'none' : 'auto',
          animation: 'hintBob 2.8s ease-in-out infinite',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Explorar obras"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Text arc at radius 52 — sits outside the solid circle (radius 32) */}
            <path
              id="explorar-path"
              d="M 60,60 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
            />
          </defs>

          {/* Solid linen fill */}
          <circle cx="60" cy="60" r="32" fill="#F2EFE9" />
          {/* Umber border */}
          <circle cx="60" cy="60" r="32" stroke="#7E6B5A" strokeWidth="1" opacity="0.75" />

          {/* Spinning text — on the larger arc, outside the solid circle */}
          <g style={{ animation: 'explorarSpin 16s linear infinite', transformOrigin: '60px 60px' }}>
            <text
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8.5px',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fill: '#7E6B5A',
              }}
            >
              <textPath href="#explorar-path" startOffset="0%">
                EXPLORAR · EXPLORAR · EXPLORAR · EXPLORAR ·
              </textPath>
            </text>
          </g>

          {/* Down arrow — static inside the solid circle */}
          <line x1="60" y1="44" x2="60" y2="66" stroke="#7E6B5A" strokeWidth="1.6" strokeLinecap="round" />
          <polyline points="53,60 60,68 67,60" fill="none" stroke="#7E6B5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style jsx global>{`
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hintBob {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(9px); }
        }
        @keyframes explorarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
