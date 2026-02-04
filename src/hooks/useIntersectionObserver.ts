import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  onIntersect: () => void;
  enabled?: boolean;
}

/**
 * Generic intersection observer hook for lazy loading and infinite scroll
 */
export function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  onIntersect,
  enabled = true,
}: UseIntersectionObserverOptions): RefObject<T | null> {
  const targetRef = useRef<T>(null);
  const onIntersectRef = useRef(onIntersect);
  const isIntersectingRef = useRef(false);
  onIntersectRef.current = onIntersect;

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        if (!isIntersectingRef.current) {
          isIntersectingRef.current = true;
          onIntersectRef.current();
        }
      } else {
        isIntersectingRef.current = false;
      }
    }, { threshold, rootMargin });

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, enabled]);

  return targetRef;
}
