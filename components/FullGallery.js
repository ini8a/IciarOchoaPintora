'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALERIA } from '@/data/galeria';

gsap.registerPlugin(ScrollTrigger);

const ASPECT_RATIO = {
  portrait: '2 / 3',
  square: '1 / 1',
  wide: '3 / 2',
};

export default function FullGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const animatedItems = new Set();
    const items = Array.from(track.querySelectorAll('[data-item]'));

    const ctx = gsap.context(() => {
      gsap.set(items, { y: 70, opacity: 0 });

      const getDistance = () => track.scrollHeight - container.clientHeight;

      gsap.to(track, {
        y: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => '+=' + getDistance(),
          pin: true,
          scrub: 2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const velocity = Math.abs(self.getVelocity());
            const duration = Math.max(0.25, 1.1 - velocity / 1800);

            items.forEach(item => {
              if (animatedItems.has(item)) return;
              const { top } = item.getBoundingClientRect();
              if (top < window.innerHeight - 20) {
                animatedItems.add(item);
                gsap.to(item, { y: 0, opacity: 1, duration, ease: 'power2.out', overwrite: true });
              }
            });
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="galeria"
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent',
        position: 'relative',
      }}
    >
      {/* Section label — stays fixed inside the pinned container */}
      <div style={{
        position: 'absolute',
        top: '32px',
        left: '32px',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: '#4E8B8B',
        }}>
          Galería
        </span>
      </div>

      {/* Scrolling art track */}
      <div
        ref={trackRef}
        style={{
          columns: 4,
          columnGap: '10px',
          padding: '10px',
          willChange: 'transform',
        }}
      >
        {GALERIA.map((item) => (
          <Link
            key={item.id}
            href={`/galeria/${item.id}`}
            data-item
            style={{
              display: 'block',
              breakInside: 'avoid',
              marginBottom: '10px',
              position: 'relative',
              cursor: 'pointer',
              aspectRatio: ASPECT_RATIO[item.aspect],
              background: item.color,
              textDecoration: 'none',
              overflow: 'hidden',
              transition: 'box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.018)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(45,45,45,0.13)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="25vw"
                style={{ objectFit: 'cover' }}
              />
            )}
            <span style={{
              position: 'absolute',
              top: '14px',
              left: '16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'rgba(242,239,233,0.7)',
            }}>
              {String(item.id).padStart(2, '0')}
            </span>
            <span style={{
              position: 'absolute',
              bottom: '14px',
              left: '16px',
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontStyle: 'italic',
              color: 'rgba(242,239,233,0.85)',
            }}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
