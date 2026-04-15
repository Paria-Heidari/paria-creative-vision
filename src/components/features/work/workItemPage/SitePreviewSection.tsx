import Image from 'next/image';
import Typography from '../../../ui/Typography/Typography';

interface SitePreviewSectionProps {
  title: string;
  previewImage: string;
}

export default function SitePreviewSection({
  title,
  previewImage,
}: SitePreviewSectionProps) {
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
          <Image
            src={previewImage}
            alt={`${title} full-page preview`}
            width={1440}
            height={4000}
            className="w-full"
          />
        </div>
      </section>
  );
}
