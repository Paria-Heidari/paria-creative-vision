'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils/utils";

interface CtaMediumProps {
  mediumUsername: string;
  className?: string;
}

const CtaMedium = ({ mediumUsername, className }: CtaMediumProps) => {
  const mediumUrl = `https://medium.com/@${mediumUsername}`;
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn('text-center', className)}
      >
        <Typography variant="lead" as="p" className="text-foreground-muted mb-4">
          Read more articles on Medium
        </Typography>
        <Link
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button btnText="View on Medium" variant="secondary" size="md" startIcon={<ExternalLink className="w-4 h-4" />} />
        </Link>
      </motion.div>
  );
};

export default CtaMedium;