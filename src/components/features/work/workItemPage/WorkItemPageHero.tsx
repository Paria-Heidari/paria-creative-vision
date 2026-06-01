import Image from 'next/image';
import { Stack } from '@/components/layout/Stack';
import { DecorativeLine } from '@/components/ui/DecorativeLine';
import { Typography } from '@/components/ui/Typography';
import PlaceholderImage from '@/components/ui/PlaceholderImage/PlaceholderImage';

interface WorkItemPageHeroProps {
  title: string;
  description: string | null;
  year: string | null;
  coverImage?: string | null;
}

export default function WorkItemPageHero({
  title,
  description,
  year,
  coverImage,
}: WorkItemPageHeroProps) {
  const imageUrl = coverImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${coverImage}`
    : null;

  return (
    <Stack direction="vertical" gap={{ base: 6, md: 8 }}>
      <DecorativeLine />
      <Typography
        variant="caption"
        as="span"
        className="text-foreground-subtle"
      >
        {year}
      </Typography>
      <Typography variant="h2" as="h1" className="font-syne max-w-3xl">
        {title}
      </Typography>
      <Typography
        variant="lead"
        as="p"
        className="text-foreground-muted max-w-4xl"
      >
        {description}
      </Typography>
      {imageUrl ? (
        <div className="mt-10 md:mt-12">
          <div className="border-border overflow-hidden rounded-lg border-5 shadow-lg">
            <Image
              src={imageUrl}
              alt={`${title} screenshot`}
              width={1920}
              height={1080}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      ) : (
        <PlaceholderImage label="Preview coming soon" />
      )}
    </Stack>
  );
}
