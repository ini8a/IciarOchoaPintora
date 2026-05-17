import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import GalleryIntro from '@/components/GalleryIntro';
import FullGallery from '@/components/FullGallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav transparent />
      <main style={{ position: 'relative' }}>

        {/* 200vh gives the sticky hero exactly 100vh of scroll to exit.
            pointer-events none so the dead lower half never blocks gallery. */}
        <div style={{ height: '200vh', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <Hero />
        </div>

        {/* Gallery pulled up -100vh: its top aligns with page 100vh = hero exit point.
            GSAP will pin it and expand the scroll space for horizontal movement. */}
        <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 5 }}>
          <Gallery />
        </div>

        {/* GalleryIntro pins via GSAP: phase 1 stays still, phase 2 slides up as curtain.
            FullGallery appears naturally from behind as the curtain lifts. */}
        <GalleryIntro />

        <FullGallery />

      </main>

      <Footer />
    </>
  );
}
