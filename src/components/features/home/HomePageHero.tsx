'use client';

import { useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';
import { homePageHeroInfo } from '@/data/staticData';

const HomePageHero = () => {
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
    <section className="relative mb-16 flex h-[90vh] items-end overflow-hidden">
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
        <Stack
          direction="vertical"
          gap={{ base: 6, md: 8 }}
          className="animate-fade-up max-w-3xl motion-reduce:animate-none"
        >
          <Typography
            variant="caption"
            as="span"
            className="text-accent-gold font-semibold tracking-[0.3em] uppercase"
          >
            {homePageHeroInfo.subTitle}
          </Typography>
          <Typography variant="h2" as="h1" className="tracking-wide text-white">
            {homePageHeroInfo.heading}
            <br />
            <span className="text-accent-gold-light">
              {homePageHeroInfo.heading2}
            </span>
          </Typography>
          <Typography
            variant="paragraph"
            as="p"
            className="tracking-[0.1em] text-white/90"
          >
            {homePageHeroInfo.subHeading}
          </Typography>
        </Stack>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to main content"
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-md px-2 py-1 text-white/70 transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <Typography
          variant="caption"
          as="span"
          className="tracking-[0.3em] text-inherit uppercase"
        >
          {homePageHeroInfo.scrollLabel}
        </Typography>
        <ChevronDown
          className="animate-bounce-subtle h-5 w-5 motion-reduce:animate-none"
          aria-hidden
          strokeWidth={1.35}
        />
      </button>
    </section>
  );
};

export default HomePageHero;
