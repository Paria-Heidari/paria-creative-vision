'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Camera, MapPin, Mail, ArrowRight } from 'lucide-react';
import GitHubIcon from '@/components/icons/GitHubIcon';

// Skills data
const techSkills = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Azure',
  'Tailwind CSS', 'PostgreSQL', 'Supabase', 'AI', "SCSS"
];

const photoSkills = [
  'Landscape','Street Photography', 'Travel', 'Portrait', 'Architecture'
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-1 bg-accent-gold mx-auto mb-6 rounded-full" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold text-foreground mb-4">
              About Me
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              A software developer with a passion for visual storytelling
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center"
          >
            {/* Photo */}
            <div className="md:col-span-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/me.jpg"
                  alt="Paria - Software Developer & Photographer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent-gold" />
                    Based in Europe
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-syne font-bold text-foreground mb-4">
                  Hi, I&apos;m Paria
                </h2>
                <div className="space-y-4 text-foreground-muted leading-relaxed">
                  <p>
                    I&apos;m a software developer who found a second language in photography.
                    By day, I craft digital experiences through code—building web applications. By heart, I capture the
                    world through my lens, finding poetry in landscapes, architecture, and
                    fleeting moments.
                  </p>
                  <p>
                    My journey began with curiosity about how things work, which led me to
                    programming. But somewhere along the way, I discovered that the same
                    analytical mind that debugs code also sees patterns in light and shadow,
                    composition in chaos, and stories in stillness.
                  </p>
                  <p>
                    This portfolio is where both worlds meet—where technical precision
                    embraces artistic expression. Whether I&apos;m writing codes or
                    chasing golden hour light across World landscapes, I&apos;m always
                    seeking that perfect balance of logic and moments.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="mailto:paria.heidari.ph@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-white rounded-full font-medium hover:bg-accent-gold-hover transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/20 text-foreground rounded-full font-medium hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two Worlds Section */}
      <section className="py-20 px-6 sm:px-8 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-foreground mb-4">
              Two Worlds, One Vision
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Where analytical thinking meets creative expression
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Developer Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-syne font-bold text-foreground mb-4">
                The Developer
              </h3>
              <p className="text-foreground-muted mb-6 leading-relaxed">
                Building modern web applications with a focus on clean code,
                performance, and user experience. I believe in writing code
                that&apos;s not just functional, but elegant and maintainable.
              </p>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-accent-gold/10 text-accent-gold-hover text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Photographer Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-14 h-14 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-7 h-7 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-syne font-bold text-foreground mb-4">
                The Photographer
              </h3>
              <p className="text-foreground-muted mb-6 leading-relaxed">
                Capturing moments that tell stories. From sweeping landscapes
                to intimate street scenes, I seek the extraordinary in the
                ordinary and the timeless in the fleeting.
              </p>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {photoSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-accent-gold/10 text-accent-gold-hover text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-foreground mb-6">
              Let&apos;s Create Something Together
            </h2>
            <p className="text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
              Whether you need a web application built, want to collaborate on
              a photography project, or just want to say hello—I&apos;d love to
              hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:paria.heidari.ph@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-white rounded-full font-medium text-lg hover:bg-accent-gold-hover transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pages/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-medium text-lg hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
