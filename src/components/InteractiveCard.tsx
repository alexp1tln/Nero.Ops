import { motion } from 'motion/react';
import React, { useState } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function InteractiveCard({ children, className = '', onClick, ...props }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Even glow overlay */}
      <div className={`absolute inset-0 bg-white/[0.03] pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Core card content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
