import { useState, useEffect, useRef, useCallback } from 'react';
import { useImageLoading } from '../../hooks/useImageLoading';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { isVideoFile } from '../../utils/imageUtils';
import PDFSection from './PDFSection';
import GalleryGrid from './GalleryGrid';
import LoadMoreButton from './LoadMoreButton';
import './Gallery1040.css';

const INITIAL_VISIBLE = 6;
const LOAD_INCREMENT = 6;

function Gallery1040() {
  const { imageData, isDataLoaded } = useImageLoading();
  const [visibleImages, setVisibleImages] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const loadMoreImages = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + LOAD_INCREMENT, imageData.length));
      setIsLoading(false);
    }, 100);
  }, [isLoading, imageData.length]);

  const hasMoreImages = visibleImages < imageData.length;

  const loadMoreRef = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    onIntersect: loadMoreImages,
    enabled: hasMoreImages,
  });

  // Video lazy loading observer
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            const src = video.dataset.src;
            if (src && !loadedVideos.has(src)) {
              video.src = src;
              video.load();
              setLoadedVideos(prev => new Set(prev).add(src));
              videoObserver.unobserve(video);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    videoRefs.current.forEach((video) => {
      if (video) {
        videoObserver.observe(video);
      }
    });

    return () => {
      videoObserver.disconnect();
    };
  }, [visibleImages, loadedVideos]);

  const handleVideoRef = useCallback((filename: string) => {
    return (el: HTMLVideoElement | null) => {
      if (el && isVideoFile(filename)) {
        videoRefs.current.set(filename, el);
      }
    };
  }, []);

  return (
    <div className="gallery-app">
      <PDFSection />
      <GalleryGrid
        imageData={imageData}
        visibleCount={visibleImages}
        isLoading={!isDataLoaded}
        onVideoRef={handleVideoRef}
      />
      {hasMoreImages && (
        <LoadMoreButton
          ref={loadMoreRef}
          isLoading={isLoading}
          remainingCount={imageData.length - visibleImages}
          onClick={loadMoreImages}
        />
      )}
    </div>
  );
}

export default Gallery1040;
