'use client';

import { useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { homePageHeroInfo } from '@/data/data';

const Hero = () => {
  const scrollToContent = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: window.innerHeight,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  return (
    <section className="relative flex h-[90vh] items-end overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/IMG_1174.mov" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-24 sm:px-12 sm:pb-32 lg:px-20">
        <Stack direction="vertical" gap={6} className="max-w-3xl animate-fade-up motion-reduce:animate-none">
          <Typography variant="caption" as="span" className="text-accent-gold tracking-[0.3em] uppercase">
            {homePageHeroInfo.subTitle}
          </Typography>
          <Typography variant="h1" as="h1" className="text-white tracking-wide">
            {homePageHeroInfo.heading}
            <br />
            <span className="text-accent-gold-light">Through Code & Lens</span>
          </Typography>
          <Typography variant="paragraph" as="p" className="text-white/90 tracking-wide">
            {homePageHeroInfo.subHeading}
          </Typography>
        </Stack>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to main content"
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 rounded-md px-2 py-1 text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Typography variant="caption" as="span" className="tracking-[0.3em] uppercase text-inherit">
          {homePageHeroInfo.scrollLabel}
        </Typography>
        <ChevronDown
          className="h-5 w-5 animate-bounce-subtle motion-reduce:animate-none"
          aria-hidden
          strokeWidth={1.35}
        />
      </button>
    </section>
  );
};

export default Hero;
