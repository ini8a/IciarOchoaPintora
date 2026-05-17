'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useState } from 'react';

function CopyButton({ label, value, href, callHref }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
      <span style={microLabel}>{label}</span>
      <div style={{
        background: '#D4CCBE',
        border: '1px solid #2D2D2D',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: '#2D2D2D',
          fontStyle: 'italic',
        }}>
          {value}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleCopy} style={smallBtnStyle}>
            {copied ? 'Copiado ✓' : 'Copiar'}
          </button>
          <a href={href} style={smallBtnStyle}>
            {callHref ? 'Llamar' : 'Enviar email'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Nav />
      <main style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        paddingTop: '84px',
      }}>

        {/* LEFT */}
        <div style={{
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRight: '1px solid #D1CDC4',
        }}>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#2D2D2D',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '0 0 36px',
          }}>
            Me encantaría<br />escucharte
          </h1>

          {/* Email + Phone */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
            <CopyButton
              label="Email"
              value="iciarochoa@gmail.com"
              href="mailto:iciarochoa@gmail.com"
            />
            <CopyButton
              label="Teléfono"
              value="636 528 321"
              href="tel:+34636528321"
              callHref
            />
          </div>

          {/* Social */}
          <div>
            <span style={{ ...microLabel, display: 'block', marginBottom: '10px' }}>
              Redes sociales
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="https://www.instagram.com/iciarochoapintora"
                target="_blank"
                rel="noopener noreferrer"
                style={socialBtnStyle}
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/search/top?q=Iciar%20Ochoa%20Pintora"
                target="_blank"
                rel="noopener noreferrer"
                style={socialBtnStyle}
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT — form */}
        <div style={{
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <div style={{
            background: '#D4CCBE',
            border: '1px solid #2D2D2D',
            padding: '32px 40px',
          }}>
            <span style={{ ...microLabel, display: 'block', marginBottom: '24px' }}>
              Envíame un mensaje
            </span>

            {sent ? (
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                fontStyle: 'italic',
                color: '#2D2D2D',
                lineHeight: 1.5,
                margin: 0,
              }}>
                Gracias, he recibido tu mensaje.<br />Te escribo pronto.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Field
                  label="Nombre"
                  value={form.nombre}
                  onChange={v => setForm(f => ({ ...f, nombre: v }))}
                  required
                />
                <Field
                  label="Teléfono (opcional)"
                  value={form.telefono}
                  onChange={v => setForm(f => ({ ...f, telefono: v }))}
                  type="tel"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  type="email"
                  required
                />
                <Field
                  label="Cuéntame más (opcional)"
                  value={form.mensaje}
                  onChange={v => setForm(f => ({ ...f, mensaje: v }))}
                  multiline
                />
                <div style={{ paddingTop: '20px' }}>
                  <button
                    type="submit"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#F2EFE9',
                      background: '#2D2D2D',
                      border: '1px solid #2D2D2D',
                      padding: '14px 40px',
                      cursor: 'pointer',
                    }}
                  >
                    Enviar mensaje
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

function Field({ label, value, onChange, type = 'text', multiline = false, required }) {
  const inputStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: '#2D2D2D',
    background: '#F2EFE9',
    border: '1px solid #C4BAB0',
    outline: 'none',
    width: '100%',
    padding: '10px 12px',
    resize: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={microLabel}>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          style={inputStyle}
        />
      )}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const microLabel = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#7E6B5A',
};

const smallBtnStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#2D2D2D',
  background: 'transparent',
  border: '1px solid #2D2D2D',
  padding: '6px 12px',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
};

const socialBtnStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#2D2D2D',
  background: '#D4CCBE',
  border: '1px solid #2D2D2D',
  padding: '10px 18px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};
