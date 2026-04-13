"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.08, once = true, delay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      if (delay > 0) {
        setTimeout(() => setVisible(true), delay);
      } else {
        setVisible(true);
      }
      if (once) observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
        } else if (!once) {
          setVisible(false);
        }
      },
      // rootMargin: expand detection zone 60px below viewport bottom
      // so elements near the bottom don't get missed
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    // Safety fallback: if element is already in viewport on mount
    // (e.g. page loads mid-scroll), IntersectionObserver fires async
    // and can miss it. Force-check after 1 frame.
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) show();
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [threshold, once, delay]);

  return { ref, visible };
}

export function staggerStyle(index: number, baseDelay = 80): React.CSSProperties {
  return { "--stagger-delay": `${index * baseDelay}ms` } as React.CSSProperties;
}
