import { useRef, useEffect, useCallback } from 'react';
import { isVideoFile } from '../utils/imageUtils';

interface UseVideoLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
}

interface UseVideoLazyLoadingReturn {
  getVideoRef: (filename: string) => (el: HTMLVideoElement | null) => void;
}

export function useVideoLazyLoading(
  options: UseVideoLazyLoadingOptions = {}
): UseVideoLazyLoadingReturn {
  const { threshold = 0.1, rootMargin = '200px' } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedVideos = useRef<Set<string>>(new Set());
  const pendingElements = useRef<HTMLVideoElement[]>([]);

  // Create observer once on mount
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            const src = video.dataset.src;
            if (src && !loadedVideos.current.has(src)) {
              video.src = src;
              video.load();
              loadedVideos.current.add(src);
              observerRef.current?.unobserve(video);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    if (pendingElements.current.length > 0) {
      pendingElements.current.forEach((el) => observerRef.current?.observe(el));
      pendingElements.current = [];
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  // Observe videos immediately when they're registered
  const getVideoRef = useCallback((filename: string) => {
    return (el: HTMLVideoElement | null) => {
      if (!el || !isVideoFile(filename)) {
        return;
      }

      if (observerRef.current) {
        observerRef.current.observe(el);
      } else {
        pendingElements.current.push(el);
      }
    };
  }, []);

  return { getVideoRef };
}
