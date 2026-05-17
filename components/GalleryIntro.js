'use client';

import { useState, useRef, useCallback } from 'react';

export default function GalleryIntro() {
  const [flipped, setFlipped]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor]     = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 7,
        cursor: hovering ? 'none' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Cursor follower — always in DOM, opacity-toggled to avoid insertBefore conflicts */}
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        transform: 'translate(-50%, calc(-50% - 24px))',
        pointerEvents: 'none',
        zIndex: 20,
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(11px, 1vw, 13px)',
        fontStyle: 'italic',
        color: '#2D2D2D',
        background: '#F2EFE9',
        padding: '6px 14px',
        whiteSpace: 'nowrap',
        letterSpacing: '0.04em',
        boxShadow: '0 2px 16px rgba(45,45,45,0.10)',
        opacity: hovering ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}>
        {flipped ? 'Volver' : 'Leer dedicatoria'}
      </div>

      {/* 3-D flip card */}
      <div style={{
        width: 'min(92vw, 92vh)',
        height: 'min(92vw, 92vh)',
        perspective: '1200px',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.85s cubic-bezier(0.4, 0.2, 0.2, 1)',
        }}>

          {/* FRONT — canvas + "Bienvenidos a mi Galería" */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}>
            <img
              src="/images/Blank_Canvas_3.png"
              alt=""
              style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
            />
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              width: '90%',
              height: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(9px, 1vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: '#7E6B5A',
              }}>
                Colección completa
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(36px, 6.5vw, 100px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#2D2D2D',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
                textAlign: 'center',
              }}>
                Bienvenidos a<br />mi Galería
              </h2>
            </div>
          </div>

          {/* BACK — thank-you letter */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
            <img
              src="/images/Blank_Canvas_3.png"
              alt=""
              style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none' }}
            />
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(8px, 0.8vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#7E6B5A',
              }}>
                Una nota de Iciar
              </span>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(12px, 1.3vw, 18px)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#2D2D2D',
                lineHeight: 1.8,
                margin: 0,
              }}>
                Gracias por estar aquí.<br /><br />
                Cada obra que ves en esta galería nació de un momento que quise conservar:
                una luz que me sorprendió, una emoción que no sabía cómo decir con palabras.<br /><br />
                Espero que algo de lo que encuentres aquí hable también a ti.
              </p>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(12px, 1.3vw, 18px)',
                fontStyle: 'italic',
                color: '#7E6B5A',
                marginTop: '4px',
              }}>
                — Iciar
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
