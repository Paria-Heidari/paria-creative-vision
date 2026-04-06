import { formatDate, MediumArticle } from '@/lib/api/mediumArticles';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';

interface ArticleCardProps {
  article: MediumArticle;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* Thumbnail */}
      <div
        className="bg-surface-muted relative h-[240px] w-full flex-shrink-0 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={article.thumbnail}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content — heading first for screen readers */}
      <div className="flex flex-1 flex-col p-6">
        <Typography
          variant="h5"
          as="h2"
          className="group-hover:text-accent-gold mb-3 line-clamp-2 transition-colors duration-200"
        >
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-accent-gold rounded focus-visible:ring-2 focus-visible:outline-none"
            aria-label={`${article.title} (opens in new tab)`}
          >
            {article.title}
          </Link>
        </Typography>

        <Typography
          variant="paragraphSmall"
          as="p"
          className="text-foreground-muted mb-4 line-clamp-2"
        >
          {article.description}
        </Typography>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-4">
          <Typography
            variant="caption"
            as="span"
            className="text-foreground-muted flex items-center gap-1.5"
          >
            <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
            <time dateTime={article.pubDate}>
              {formatDate(article.pubDate)}
            </time>
          </Typography>
          <Typography
            variant="caption"
            as="span"
            className="text-foreground-muted flex items-center gap-1.5"
          >
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{article.readTime} min read</span>
          </Typography>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
