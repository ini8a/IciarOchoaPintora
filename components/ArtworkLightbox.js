'use client';

import { useState } from 'react';
import Image from 'next/image';

const THUMB = 110;

export default function ArtworkLightbox({ images, title }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [modalOpen, setModalOpen]     = useState(false);
  const [sent, setSent]               = useState(false);
  const [form, setForm]               = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: `Estoy interesado/a en la obra "${title}". Me gustaría recibir más información.`,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const visibleThumbs = images.slice(0, 2);

  function openThumb(src) {
    setLightboxSrc(src);
  }

  return (
    <>
      {/* ── Primary row: first 2 thumbs + CTA ──────── */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: THUMB }}>

        {visibleThumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => openThumb(src)}
            style={{
              padding: 0,
              border: '1px solid #C4BAB0',
              background: 'none',
              cursor: 'zoom-in',
              width: THUMB,
              height: THUMB,
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={src}
              alt={`${title} — vista ${i + 1}`}
              fill
              sizes="110px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}

        {/* CTA square — fills remaining width, slightly smaller than thumbnails */}
        <button
          onClick={() => setModalOpen(true)}
          style={{
            flex: 1,
            height: THUMB - 24,
            background: '#2D2D2D',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F2EFE9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            lineHeight: 1.6,
            padding: '0 16px',
          }}
        >
          Solicitar<br />información
        </button>

      </div>

      {/* ── Lightbox overlay ──────────────────────── */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,18,16,0.92)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          {/* Main image */}
          <img
            src={lightboxSrc}
            alt={title}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: images.length > 1 ? '78vh' : '90vh',
              objectFit: 'contain',
              display: 'block',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              cursor: 'default',
              flexShrink: 0,
            }}
          />

          {/* Thumbnail strip — all images */}
          {images.length > 1 && (
            <div
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '20px',
                padding: '0 20px',
                overflowX: 'auto',
                flexShrink: 0,
                cursor: 'default',
              }}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxSrc(src)}
                  style={{
                    padding: 0,
                    border: src === lightboxSrc ? '2px solid #F2EFE9' : '2px solid transparent',
                    background: 'none',
                    cursor: 'pointer',
                    width: 72,
                    height: 72,
                    flexShrink: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    opacity: src === lightboxSrc ? 1 : 0.55,
                    transition: 'opacity 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${title} — vista ${i + 1}`}
                    fill
                    sizes="72px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: 'absolute',
              top: '28px',
              right: '36px',
              background: 'none',
              border: 'none',
              color: '#F2EFE9',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              opacity: 0.75,
            }}
          >
            Cerrar ✕
          </button>
        </div>
      )}

      {/* ── Contact modal ─────────────────────────── */}
      {modalOpen && (
        <div
          onClick={() => { setModalOpen(false); setSent(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,18,16,0.6)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#D4CCBE',
              border: '1px solid #2D2D2D',
              padding: '40px 48px',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={() => { setModalOpen(false); setSent(false); }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7E6B5A',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <span style={microLabel}>Solicitar información</span>

            {sent ? (
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontStyle: 'italic',
                color: '#2D2D2D',
                lineHeight: 1.5,
                margin: '24px 0 0',
              }}>
                Gracias, he recibido tu mensaje.<br />Te escribo pronto.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <ModalField
                  label="Nombre"
                  value={form.nombre}
                  onChange={v => setForm(f => ({ ...f, nombre: v }))}
                  required
                />
                <ModalField
                  label="Teléfono (opcional)"
                  value={form.telefono}
                  onChange={v => setForm(f => ({ ...f, telefono: v }))}
                  type="tel"
                />
                <ModalField
                  label="Email"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  type="email"
                  required
                />
                <ModalField
                  label="Cuéntame más"
                  value={form.mensaje}
                  onChange={v => setForm(f => ({ ...f, mensaje: v }))}
                  multiline
                />
                <div style={{ paddingTop: '16px' }}>
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
      )}
    </>
  );
}

function ModalField({ label, value, onChange, type = 'text', multiline = false, required }) {
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
        <textarea value={value} onChange={e => onChange(e.target.value)} required={required} rows={3} style={inputStyle} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} style={inputStyle} />
      )}
    </div>
  );
}

const microLabel = {
  fontFamily: 'var(--font-sans)',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#7E6B5A',
  display: 'block',
};
