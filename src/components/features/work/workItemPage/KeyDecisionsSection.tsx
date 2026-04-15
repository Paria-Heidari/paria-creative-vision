import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/ui/Typography';

interface KeyDecisionsSectionProps {
  title: string;
  description: string;
  index: number;
}

export default function KeyDecisionsSection({
  title,
  description,
  index,
}: KeyDecisionsSectionProps) {
  return (
    <div className="border-l-accent-gold group border-l-2 pl-6">
      <Stack direction="vertical" gap={3}>
        <Stack direction="horizontal" gap={3} align="center">
          <span className="text-accent-gold font-mono text-xs">
            {String(index + 1).padStart(2, '0')}
          </span>
          <Typography variant="h6" as="h3">
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="paragraph"
          as="p"
          className="text-foreground-muted"
        >
          {description}
        </Typography>
      </Stack>
    </div>
  );
}
