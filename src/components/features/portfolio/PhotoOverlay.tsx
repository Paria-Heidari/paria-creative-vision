import { MapPin } from 'lucide-react';
import { Photo } from '@/types/photo.types';
import { Typography } from '@/components/ui/Typography';
import Stack from '@/components/layout/Stack/Stack';

interface PhotoOverlayProps {
  photo: Photo;
}

const PhotoOverlay = ({ photo }: PhotoOverlayProps) => {
  return (
    <Stack
      direction="vertical"
      gap={2}
      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-5"
    >
      <Typography variant="h6" as="h3" className="tracking-wider text-white/90">
        {photo.title}
      </Typography>
      {photo.location_city && (
        <Typography
          variant="caption"
          as="p"
          className="mb-2 flex items-center gap-2 text-white/80"
        >
          <MapPin className="text-accent-gold h-4 w-4" />
          {photo.location_city}, {photo.location_country}
        </Typography>
      )}
      {photo.description && (
        <Typography
          variant="caption"
          as="p"
          className="line-clamp-2 text-white/90"
        >
          {photo.description}
        </Typography>
      )}
    </Stack>
  );
};

export default PhotoOverlay;
