'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ label }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: '#7E6B5A',
        background: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #C4BAB0',
        padding: '7px 16px',
        alignSelf: 'flex-start',
        marginBottom: '20px',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
      }}
    >
      ← {label}
    </button>
  );
}
