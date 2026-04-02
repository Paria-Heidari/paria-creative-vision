'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography";

interface CtaMediumProps {
  mediumUsername: string;
}

const CtaMedium = ({ mediumUsername }: CtaMediumProps) => {
  const mediumUrl = `https://medium.com/@${mediumUsername}`;
  return (
    <div className="mt-16 text-center max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
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
    </div>
  );
};

export default CtaMedium;