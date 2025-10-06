import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface AnimatedCounterProps {
  target: number;            // Target numeric value to count to
  duration?: number;         // Duration in ms
  suffix?: string;           // Text appended after number e.g. '+'
  className?: string;        // Tailwind / className
  startOnView?: boolean;     // Only start when in viewport
}

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1600,
  suffix = '',
  className = '',
  startOnView = true
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    if (!hasStarted) return; // Wait until in view if needed

    const animate = (timestamp: number) => {
      if (startTimeRef.current == null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = clamp(elapsed / duration, 0, 1);
      // EaseOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [hasStarted, target, duration, prefersReducedMotion]);

  useEffect(() => {
    if (!startOnView || prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;
