'use client';

import { useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

const HERO_HEADING_ID = 'hero-heading';

const Hero = () => {
  
  const scrollToContent = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: window.innerHeight * 1,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  return (
    <section
      className="relative flex h-[90vh] items-end overflow-hidden"
      aria-labelledby={HERO_HEADING_ID}
    >
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

      <div className="relative z-10 w-full px-6 pb-24 sm:px-12 sm:pb-32 lg:px-20">
        <Stack
          direction="vertical"
          gap={4}
          className="max-w-3xl motion-reduce:animate-none animate-fade-up"
        >
          <Typography
            variant="caption"
            as="span"
            className="text-accent-gold tracking-[0.3em] uppercase"
          >
            Photography & Code
          </Typography>
          <Typography
            variant="h1"
            as="h1"
            className="text-white tracking-wide drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]"
          >
            Exploring the World
            <br />
            <span className="text-accent-gold-light">Through Code & Lens</span>
          </Typography>
          <Typography
            variant="paragraph"
            as="p"
            className="text-white/90 tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
          >
            Visual Stories by Paria
          </Typography>
        </Stack>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="md"
        onClick={scrollToContent}
        aria-label="Scroll to main content"
        className="group absolute bottom-8 left-1/2 z-10 min-h-[3.25rem] min-w-[4.5rem] -translate-x-1/2 flex-col gap-2 border-0 px-4 py-3 shadow-none ring-offset-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <Typography variant="caption" as="span" className="text-sm font-medium uppercase tracking-[0.32em] text-white/85 transition-[color,font-size] duration-200 group-hover:text-white group-hover:text-base motion-reduce:transition-colors motion-reduce:group-hover:text-sm">Scroll
          <ChevronDown
            className="h-5 w-5 text-white/75 transition-[color,transform] duration-200 group-hover:text-white group-hover:scale-110 motion-reduce:animate-none motion-reduce:group-hover:scale-100 animate-bounce-subtle"
            aria-hidden
            strokeWidth={1.35}
          />
        </Typography>
      </Button>
    </section>
  );
};

export default Hero;
