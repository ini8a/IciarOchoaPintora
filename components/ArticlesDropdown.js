const ARTICLES = [
  {
    label: '«Talentazo» en Pamplonanews',
    href: 'https://www.pamplonews.com/2024/04/25/gente-de-pamplonews-con-talentazo-iciar/',
  },
  {
    label: 'Conoce a Iciar en Family Lovers',
    href: 'https://familylovers.es/transforma-momentos-en-arte-conoce-a-iciar-ochoa-y-sus-cuadros-personalizados/',
  },
];

export default function ArticlesDropdown() {
  return (
    <div style={{ borderTop: '1px solid #D1CDC4', padding: '16px 32px 24px' }}>

      {/* Outer container box */}
      <div style={{ background: '#C4BAB0', padding: '20px 20px 16px' }}>

        {/* Label */}
        <div style={{
          display: 'inline-block',
          background: '#EDE6DA',
          padding: '5px 14px',
          marginBottom: '12px',
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#7E6B5A',
          }}>
            Ver artículos
          </span>
        </div>

        {/* Article links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ARTICLES.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(12px, 1vw, 14px)',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 1.8,
                color: '#2D2D2D',
                textDecoration: 'none',
                padding: '10px 16px',
                background: '#EDE6DA',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: '#7E6B5A', flexShrink: 0 }}>↗</span>
              {label}
            </a>
          ))}
        </div>

      </div>

    </div>
  );
}
