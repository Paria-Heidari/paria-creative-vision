import { BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Typography from '../../../ui/Typography/Typography';
import { Stack } from '@/components/layout/Stack';

interface WorkDeepDiveSectionProps {
  articles: readonly {
    href: string;
    title: string;
  }[];
}

export default function WorkDeepDiveSection({ articles }: WorkDeepDiveSectionProps) {
  return (
    <>
      {articles.map((article) => (
        <Link
          key={article.href}
          href={article.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-border hover:border-accent-gold/30 hover:bg-surface-muted flex items-start gap-4 rounded-lg border p-5 transition-all duration-200"
        >
          <BookOpen
            className="text-accent-gold mt-0.5 h-5 w-5 shrink-0"
            aria-hidden
          />
          <Stack direction="vertical" gap={1} className="flex-1">
            <Typography
              variant="paragraphSmall"
              as="span"
              className="group-hover:text-accent-gold leading-snug font-medium transition-colors"
            >
              {article.title}
            </Typography>
            <Typography
              variant="caption"
              as="span"
              className="text-foreground-subtle"
            >
              Medium · paria-heidari
            </Typography>
          </Stack>
          <ExternalLink
            className="text-foreground-subtle group-hover:text-accent-gold mt-0.5 h-4 w-4 shrink-0 transition-colors"
            aria-hidden
          />
        </Link>
      ))}
    </>
  );
}
