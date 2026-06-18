import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const smoothX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const smoothY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  
  const ringX = useSpring(0, { stiffness: 200, damping: 25, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 200, damping: 25, mass: 0.8 });

  useEffect(() => {
    // Only mount logic if it's a fine pointer device (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.closest('[data-cursor="hover"]') ||
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // e.relatedTarget is null when leaving the document or entering a cross-origin iframe
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible, smoothX, smoothY, ringX, ringY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't render on mobile devices
  }

  return (
    <div style={{ opacity: isVisible ? 1 : 0 }} className="transition-opacity duration-300 pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}} />
      
      {/* Frosted Glass Ring ("Magnetic Lens") */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-white/20 bg-white/[0.05] backdrop-blur-[2px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovered ? 60 : 40,
          height: isHovered ? 60 : 40,
          borderColor: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.8 }}
      />
      
      {/* Sharp Silver Dot */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </div>
  );
}
