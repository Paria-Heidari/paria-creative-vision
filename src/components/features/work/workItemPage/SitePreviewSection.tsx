import Image from 'next/image';
import Typography from '@/components/ui/Typography/Typography';
import PlaceholderImage from '@/components/ui/PlaceholderImage/PlaceholderImage';

interface SitePreviewSectionProps {
  title: string;
  previewImage?: string | null;
}

export default function SitePreviewSection({
  title,
  previewImage,
}: SitePreviewSectionProps) {
  const imageUrl = previewImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${previewImage}`
    : null;

  return (
    <section className="border-border overflow-hidden rounded-lg border">
      {/* Browser chrome bar */}
      <div className="bg-surface-muted border-border flex items-center gap-2 border-b px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
          <span className="h-3 w-3 rounded-full bg-green-400/60" />
        </div>
        <div className="bg-background border-border mx-4 flex flex-1 items-center rounded-md border px-3 py-1">
          <Typography
            variant="caption"
            as="span"
            className="text-foreground-subtle truncate"
          >
            paria.eu
          </Typography>
        </div>
      </div>
      {/* Scrollable preview */}
      <div className="max-h-[680px] overflow-y-auto">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${title} full-page preview`}
            width={1440}
            height={4000}
            className="w-full"
          />
        ) : (
          <PlaceholderImage
            label="Preview coming soon"
            className="min-h-[400px]"
          />
        )}
      </div>
    </section>
  );
}
