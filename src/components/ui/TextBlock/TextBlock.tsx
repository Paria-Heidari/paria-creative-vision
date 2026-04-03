import { Stack } from '@/components/layout/Stack';
import { Typography } from '../Typography';
import { cn } from '@/lib/utils/utils';

interface TextBlockProps {
  title?: string;
  content: string;
  description?: string;
  className?: string;
}

const TextBlock = ({
  title,
  content,
  description,
  className,
}: TextBlockProps) => {
  return (
    <Stack
      direction="vertical"
      gap={{ base: 4, md: 6 }}
      textCenter="center" 
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
