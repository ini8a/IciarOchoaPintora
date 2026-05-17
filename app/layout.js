import { Playfair_Display, Raleway } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: 'Iciar Ochoa — Artista',
  description: 'Pintora especializada en acuarela, Iciar Ochoa captura la luz y la atmósfera del Mediterráneo.',
  icons: { icon: '/images/logo_transparente.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
