import React from 'react';
import { motion } from 'motion/react';

export function FadeInText({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
