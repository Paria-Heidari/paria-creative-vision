import { formatDate, MediumArticle } from "@/lib/api/mediumArticles"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion';
import { Typography } from "@/components/ui/Typography";

interface ArticleCardProps {
  article: MediumArticle
  index: number
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[240px] overflow-hidden bg-surface-muted flex-shrink-0" aria-hidden="true">
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
          className="mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors duration-200"
        >
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded"
            aria-label={`${article.title} (opens in new tab)`}
          >
            {article.title}
          </Link>
        </Typography>

        <Typography variant="paragraphSmall" as="p" className="text-foreground-muted mb-4 line-clamp-2">
          {article.description}
        </Typography>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-4">
          <Typography variant="caption" as="span" className="flex items-center gap-1.5 text-foreground-muted">
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <time dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
          </Typography>
          <Typography variant="caption" as="span" className="flex items-center gap-1.5 text-foreground-muted">
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{article.readTime} min read</span>
          </Typography>
        </div>
      </div>
    </motion.article>
  )
}

export default ArticleCard
