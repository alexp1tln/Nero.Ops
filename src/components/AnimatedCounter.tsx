import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

export function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.floor(v));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
