'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Nav({ transparent = false }) {
  const [visible, setVisible]     = useState(!transparent);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!transparent) return;
    const threshold = window.innerHeight * 0.55;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest('nav')) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const handleLogoClick = () => {
    if (menuOpen) {
      // Navigate home and scroll to top
      router.push('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const slide = (dir, delay) => ({
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? 'translateX(0)' : `translateX(${dir === 'left' ? '-36px' : '36px'})`,
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    pointerEvents: menuOpen ? 'auto' : 'none',
  });

  return (
    <>
      <style>{`
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 0px rgba(94,206,206,0); }
          50%       { box-shadow: 0 0 0 8px rgba(94,206,206,0.18); }
        }
        .logo-wrap { position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; }
        .logo-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          background: rgba(242,239,233,0.55);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .logo-btn:hover .logo-overlay { opacity: 1; }
        .logo-overlay span {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #2D2D2D;
        }
        .logo-btn img {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .logo-btn:active img { transform: scale(0.94) !important; }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : '1fr auto 1fr',
          flexDirection: isMobile ? 'column' : undefined,
          alignItems: 'center',
          padding: isMobile ? '8px 20px' : '20px 56px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Desktop left links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={slide('left', 60)}>
              <Link href="/#oportunidades" style={linkStyle}>Obras</Link>
            </div>
            <div style={slide('left', 0)}>
              <Link href="/encargos" style={linkStyle}>Encargos</Link>
            </div>
          </div>
        )}

        {/* Centre — logo button */}
        <button
          className="logo-btn"
          onClick={handleLogoClick}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: menuOpen ? 'none' : 'logoPulse 2.8s ease-in-out infinite',
            outline: 'none',
          }}
          aria-label={menuOpen ? 'Ir al inicio' : 'Abrir menú'}
        >
          <div className="logo-wrap">
            <img
              src="/images/logo_transparente.png"
              alt="Logo Iciar Ochoa"
              style={{
                height: isMobile ? '60px' : '88px',
                width: 'auto',
                display: 'block',
                transform: menuOpen && logoHover ? 'scale(1.04)' : menuOpen ? 'scale(1.06)' : 'scale(1)',
              }}
            />
            {menuOpen && (
              <div className="logo-overlay">
                <span>Inicio</span>
              </div>
            )}
          </div>
        </button>

        {/* Desktop right links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div style={slide('right', 0)}>
              <Link href="/sobre-mi" style={linkStyle}>Sobre mí</Link>
            </div>
            <div style={slide('right', 60)}>
              <Link href="/contacto" style={linkStyle}>Contacto</Link>
            </div>
          </div>
        )}

        {/* Mobile menu — slides down below logo */}
        {isMobile && (
          <div style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? '60px' : 0,
            opacity: menuOpen ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            paddingBottom: menuOpen ? '8px' : 0,
          }}>
            {[
              { href: '/#oportunidades', label: 'Obras' },
              { href: '/encargos',       label: 'Encargos' },
              { href: '/sobre-mi',       label: 'Sobre mí' },
              { href: '/contacto',       label: 'Contacto' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={linkStyle} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

const linkStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#4E8B8B',
  textDecoration: 'none',
  background: '#EDE6DA',
  padding: '8px 18px',
  borderRadius: '999px',
  whiteSpace: 'nowrap',
};
