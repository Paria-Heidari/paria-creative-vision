'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Camera, MapPin, Mail, ArrowRight } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/icons';
import { techSkills, photoSkills } from '@/data/about';
import { ROUTES } from '@/data/routes';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';

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
      <section className="relative pt-24 pb-16">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack
              direction="vertical"
              gap={{ base: 4, md: 6 }}
              align="center"
              className="mb-16 text-center"
            >
              <div className="w-12 h-1 bg-accent-gold rounded-full" />
              <Typography variant="h1" as="h1" className="font-syne">
                About Me
              </Typography>
              <Typography variant="paragraph" as="p" className="text-foreground-muted max-w-2xl">
                A software developer with a passion for visual storytelling
              </Typography>
            </Stack>
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
                  src="/images/about-paria.jpg"
                  alt="Paria - Software Developer & Photographer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Typography variant="paragraphSmall" as="p" className="text-white/90 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-gold" />
                    Based in Europe
                  </Typography>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-3">
              <Stack direction="vertical" gap={{ base: 6, md: 8 }}>
                <div>
                  <Typography variant="h3" as="h2" className="font-syne mb-4">
                    Hi, I&apos;m Paria
                  </Typography>
                  <Stack direction="vertical" gap={{ base: 4, md: 6 }}>
                    <Typography variant="paragraph" as="p" className="text-foreground-muted">
                      I&apos;m a software developer who found a second language in photography.
                      By day, I craft digital experiences through code—building web applications. Outside of code, I capture the
                      world through my lens, finding poetry in landscapes, architecture, and
                      fleeting moments.
                    </Typography>
                    <Typography variant="paragraph" as="p" className="text-foreground-muted">
                      My journey began with curiosity about how things work, which led me to
                      programming. But somewhere along the way, I discovered that the same
                      analytical mind that debugs code also sees patterns in light and shadow,
                      composition in chaos, and stories in stillness.
                    </Typography>
                    <Typography variant="paragraph" as="p" className="text-foreground-muted">
                      This portfolio is where both worlds meet-where coding meets creativity. Whether I’m writing code or exploring golden hour light across landscapes, I’m always looking for the balance between logic and moments.
                    </Typography>
                  </Stack>
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
              </Stack>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Two Worlds Section */}
      <section className="py-20 bg-accent/30">
        <Container maxWidth="xl">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <Stack
              direction="vertical"
              gap={{ base: 4, md: 6 }}
              align="center"
              className="mb-16 text-center"
            >
              <Typography variant="h2" as="h2" className="font-syne">
                Two Worlds, One Vision
              </Typography>
              <Typography variant="paragraph" as="p" className="text-foreground-muted max-w-2xl">
                Where analytical thinking meets creative expression
              </Typography>
            </Stack>
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
              <Typography variant="h4" as="h3" className="font-syne mb-4">
                The Developer
              </Typography>
              <Typography variant="paragraph" as="p" className="text-foreground-muted mb-6">
                Building modern web applications with a focus on clean code,
                performance, and user experience. I believe in writing code
                that&apos;s not just functional, but elegant and maintainable.
              </Typography>
              <Stack
                direction="vertical"
                gap={{ base: 3, md: 4 }}
              >
                <Typography variant="caption" as="h4" className="font-semibold text-foreground uppercase tracking-wider">
                  Tech Stack
                </Typography>
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
              </Stack>
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
              <Typography variant="h4" as="h3" className="font-syne mb-4">
                The Photographer
              </Typography>
              <Typography variant="paragraph" as="p" className="text-foreground-muted mb-6">
                Capturing moments that tell stories. From sweeping landscapes
                to intimate street scenes, I seek the extraordinary in the
                ordinary and the timeless in the fleeting.
              </Typography>
              <Stack
                direction="vertical"
                gap={{ base: 3, md: 4 }}
              >
                <Typography variant="caption" as="h4" className="font-semibold text-foreground uppercase tracking-wider">
                  Specialties
                </Typography>
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
              </Stack>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Stack
              direction="vertical"
              gap={{ base: 6, md: 8 }}
              align="center"
              className="text-center"
            >
              <Typography variant="h2" as="h2" className="font-syne">
                Let&apos;s Create Something Together
              </Typography>
              <Typography variant="paragraph" as="p" className="text-foreground-muted max-w-2xl">
                Whether you need a web application built, want to collaborate on
                a photography project, or just want to say hello—I&apos;d love to
                hear from you.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:paria.heidari.ph@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-white rounded-full font-medium text-lg hover:bg-accent-gold-hover transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={ROUTES.portfolio}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-medium text-lg hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </Stack>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
