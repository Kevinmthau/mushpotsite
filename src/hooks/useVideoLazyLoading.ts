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
  visibleCount: number,
  options: UseVideoLazyLoadingOptions = {}
): UseVideoLazyLoadingReturn {
  const { threshold = 0.1, rootMargin = '200px' } = options;

  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const loadedVideos = useRef<Set<string>>(new Set());

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            const src = video.dataset.src;
            if (src && !loadedVideos.current.has(src)) {
              video.src = src;
              video.load();
              loadedVideos.current.add(src);
              videoObserver.unobserve(video);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        videoObserver.observe(video);
      }
    });

    return () => {
      videoObserver.disconnect();
    };
  }, [visibleCount, threshold, rootMargin]);

  const getVideoRef = useCallback((filename: string) => {
    return (el: HTMLVideoElement | null) => {
      if (el && isVideoFile(filename)) {
        videoRefs.current.set(filename, el);
      }
    };
  }, []);

  return { getVideoRef };
}
