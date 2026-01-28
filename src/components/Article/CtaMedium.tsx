'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";
import Button from "../Button/Button";

const CtaMedium = () => {
    return (
        <div className="mt-16 text-center max-w-6xl mx-auto">     
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-foreground-muted mb-4">
              Read more articles on Medium
            </p>
            <Link
              href="https://medium.com/@paria-heidari"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="tertiary" size="md">
                <span>View on Medium</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
          </div>
    );
};

export default CtaMedium;