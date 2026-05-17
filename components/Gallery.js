'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OPORTUNIDADES } from '@/data/oportunidades';

gsap.registerPlugin(ScrollTrigger);

const ITEM_H = '80vh';
const WIDTH = {
  portrait: 'calc(80vh * 0.68)',
  square:   '80vh',
  wide:     'calc(80vh * 1.55)',
};

export default function Gallery() {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => '+=' + getDistance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="oportunidades"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: '0 60px',
          gap: '14px',
          willChange: 'transform',
        }}
      >

        {/* Intro card */}
        <div style={{
          height: ITEM_H,
          width: 'clamp(340px, 38vw, 520px)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginRight: '24px',
        }}>
          <div style={{
            background: '#D4CCBE',
            border: '1px solid #C4BAB0',
            padding: '36px 40px',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#7E6B5A',
              display: 'block',
              marginBottom: '20px',
            }}>
              Oportunidades
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 2.6vw, 38px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#2D2D2D',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              margin: '0 0 20px',
            }}>
              Dando paso a nuevas creaciones
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(13px, 1vw, 15px)',
              lineHeight: 1.8,
              color: '#2D2D2D',
              margin: 0,
            }}>
              En el taller surgen nuevas ideas y estas piezas buscan un nuevo hogar. Precios muy especiales para hacer sitio a las próximas creaciones.
            </p>
          </div>
        </div>

        {/* Artwork cards */}
        {OPORTUNIDADES.map((item) => (
          <Link
            key={item.id}
            href={`/oportunidades/${item.id}`}
            style={{
              height: ITEM_H,
              width: WIDTH[item.aspect] || WIDTH.portrait,
              flexShrink: 0,
              background: item.color,
              position: 'relative',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
              overflow: 'hidden',
              transition: 'box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.018)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(45,45,45,0.14)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Thumbnail image */}
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="40vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            )}

            {/* Index */}
            <span style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'rgba(242,239,233,0.7)',
            }}>
              {String(item.id).padStart(2, '0')}
            </span>

            {/* Title — bottom-left */}
            <span style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontStyle: 'italic',
              color: '#2D2D2D',
              background: 'rgba(242,239,233,0.78)',
              padding: '2px 8px',
            }}>
              {item.title}
            </span>

            {/* Price tag — bottom-right: strikethrough + sale */}
            <span style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              background: '#F2EFE9',
              border: '1px solid rgba(45,45,45,0.25)',
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <s style={{ color: '#9E8E80', fontWeight: 400 }}>{item.originalPrice}</s>
              <strong style={{ color: '#8B1A1A', fontWeight: 700 }}>{item.salePrice}</strong>
            </span>
          </Link>
        ))}

      </div>
    </section>
  );
}
