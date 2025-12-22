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

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, onIntersect, enabled]);

  return targetRef;
}
