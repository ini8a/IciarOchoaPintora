'use client';
import { useState, useEffect } from 'react';

export function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < bp);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [bp]);
  return mobile;
}
