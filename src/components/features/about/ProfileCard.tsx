import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { GitHubIcon } from '@/components/ui/icons';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils/utils';

interface ProfileCardProps {
  title: string;
  bio: string[];
  imageLink: string;
  imageAlt: string;
  location: string;
  emailBtnLink: string;
  emailBtnText: string;
  githubBtnLink: string;
  githubBtnText: string;
}

interface ProfileCardInfo {
  info: ProfileCardProps;
  className?: string;
}

export default function ProfileCard({ info, className }: ProfileCardInfo) {
  return (
    <section className={cn('bg-accent/30 py-10 md:py-20', className)}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid items-center gap-8 md:grid-cols-5 lg:gap-12"
        >
          {/* Image */}
          <div className="md:col-span-2">
            <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={info.imageLink}
                alt={info.imageAlt}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute right-3 bottom-6 left-3">
                <Stack direction="horizontal" gap={2} align="center">
                  <MapPin className="text-accent-gold h-5 w-5" />
                  <Typography
                    variant="paragraphSmall"
                    as="span"
                    className="text-white/90"
                  >
                    {info.location}
                  </Typography>
                </Stack>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="md:col-span-3">
            <Stack direction="vertical" gap={{ base: 6, md: 8 }}>
              <Typography variant="h3" as="h2">
                {info.title}
              </Typography>
              <Stack direction="vertical" gap={{ base: 4, md: 6 }}>
                {info.bio.map((paragraph, index) => (
                  <Typography key={index} variant="paragraph" as="p">
                    {paragraph}
                  </Typography>
                ))}
              </Stack>

              {/* Quick Links */}
              <Stack direction="horizontal" gap={{ base: 2, md: 4 }}>
                <Button
                  href={info.emailBtnLink}
                  variant="gold"
                  size="md"
                  rounded="full"
                  startIcon={<Mail className="h-4 w-4" />}
                  btnText={info.emailBtnText}
                  btnTextVariant="paragraphSmall"
                />
                <Button
                  href={info.githubBtnLink}
                  variant="tertiary"
                  size="md"
                  rounded="full"
                  external
                  startIcon={<GitHubIcon className="h-4 w-4" />}
                  btnText={info.githubBtnText}
                  btnTextVariant="paragraphSmall"
                />
              </Stack>
            </Stack>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
