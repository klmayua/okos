'use client';

import { useEffect, useRef, useState } from 'react';

export function useCountUp(
  target: number,
  duration: number = 2000,
  startOnMount: boolean = true
) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (startOnMount) {
      const timer = setTimeout(start, 300);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frameRef.current);
      };
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, startOnMount]);

  return { value, start };
}
