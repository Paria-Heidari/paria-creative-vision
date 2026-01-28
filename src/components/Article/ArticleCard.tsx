import { calculateReadTime, formatDate, MediumArticle } from "@/lib/api/mediumArticles"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion';

interface ArticleCardProps {
    article: MediumArticle
    index: number
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
    const readTime = calculateReadTime(article.description);


  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
    <Link
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
        {/* Thumbnail */}
        <div className="relative w-full h-[240px] overflow-hidden bg-white flex items-center justify-center">
            <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
        </div>
        {/* Content */}
        <div className="p-6">
            <h2 className="text-lg font-syne font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors duration-200">{article.title}</h2>
            <p className="text-sm text-foreground-muted mb-4 line-clamp-2 leading-relaxed">{article.description}</p>
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-foreground-subtle">
                <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.pubDate)}
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {readTime} min read
                </span>
            </div>
        </div>

    </Link>
    </motion.article>
  )
}

export default ArticleCard
