'use client';

import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-[90vh] flex items-end overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/IMG_1174.mov" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-24 sm:pb-32">
        <div className="max-w-4xl animate-fade-up">
          {/* Eyebrow Text */}
          <p className="text-accent-gold text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-4">
            Photography & Code
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syne text-white tracking-wide leading-tight mb-6">
            Exploring the World
            <br />
            <span className="text-accent-gold-light">Through Code & Lens</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 font-inter tracking-wide max-w-xl">
            Visual Stories by Paria
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer group"
        aria-label="Scroll to content"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce-subtle" />
      </button>
    </div>
  );
}

export default Hero;