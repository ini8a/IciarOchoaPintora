import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#2D2D2D',
      padding: '56px 72px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'start',
      gap: '40px',
    }}>

      {/* Left — brand + tagline */}
      <div>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '22px',
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#F2EFE9',
          display: 'block',
          marginBottom: '10px',
        }}>
          Iciar Ochoa
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#C4BAB0',
          display: 'block',
          marginBottom: '28px',
        }}>
          Arte · Decoración · Pamplona
        </span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="https://www.instagram.com/iciarochoapintora"
            target="_blank"
            rel="noopener noreferrer"
            style={socialStyle}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/search/top?q=Iciar%20Ochoa%20Pintora"
            target="_blank"
            rel="noopener noreferrer"
            style={socialStyle}
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Centre — nav links */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <span style={labelStyle}>Páginas</span>
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {[
            { label: 'Inicio',      href: '/' },
            { label: 'Obras',       href: '/#oportunidades' },
            { label: 'Encargos',    href: '/encargos' },
            { label: 'Sobre mí',    href: '/sobre-mi' },
            { label: 'Contacto',    href: '/contacto' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={navLinkStyle}>{label}</Link>
          ))}
        </nav>
      </div>

      {/* Right — contact */}
      <div style={{ textAlign: 'right' }}>
        <span style={labelStyle}>Contacto</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', alignItems: 'flex-end' }}>
          <a href="mailto:iciarochoa@gmail.com" style={contactLinkStyle}>
            iciarochoa@gmail.com
          </a>
          <a href="tel:+34636528321" style={contactLinkStyle}>
            636 528 321
          </a>
        </div>
      </div>

    </footer>
  );
}

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.30em',
  textTransform: 'uppercase',
  color: '#C4BAB0',
  display: 'block',
};

const navLinkStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  color: '#F2EFE9',
  textDecoration: 'none',
};

const contactLinkStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.06em',
  color: '#F2EFE9',
  textDecoration: 'none',
};

const socialStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: '#F2EFE9',
  textDecoration: 'none',
  border: '1px solid rgba(242,239,233,0.25)',
  padding: '7px 14px',
};
