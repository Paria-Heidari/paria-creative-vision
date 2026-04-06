import { Stack } from '@/components/layout/Stack';
import { Typography } from '../Typography';
import { cn } from '@/lib/utils/utils';

const textCenterMap = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
} as const;

type TextCenterPreset = keyof typeof textCenterMap;

interface TextBlockProps {
  title?: string;
  content: string;
  description?: string;
  textCenter?: TextCenterPreset;
  className?: string;
}

const TextBlock = ({
  title,
  content,
  description,
  textCenter = 'center',
  className,
}: TextBlockProps) => {
  return (
    <Stack
      direction="vertical"
      gap={{ base: 4, md: 6 }}
      textCenter={textCenter} 
      className={cn('mx-auto max-w-4xl', className)}
    >
      <Typography
        variant="h2"
        as="h2"
        className="text-foreground tracking-tight"
      >
        {title}
      </Typography>
      <Typography
        variant="lead"
        as="p"
        className="text-foreground-muted leading-relaxed"
      >
        {content}
      </Typography>
      {description ? (
        <Typography
          variant="leadSmall"
          as="p"
          className="text-foreground-subtle leading-relaxed"
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default TextBlock;
