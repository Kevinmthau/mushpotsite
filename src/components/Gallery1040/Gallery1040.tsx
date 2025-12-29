import { useState, useCallback } from 'react';
import { useImageLoading } from '../../hooks/useImageLoading';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useVideoLazyLoading } from '../../hooks/useVideoLazyLoading';
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

  const { getVideoRef } = useVideoLazyLoading(visibleImages);

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

  return (
    <div className="gallery-app">
      <PDFSection />
      <GalleryGrid
        imageData={imageData}
        visibleCount={visibleImages}
        isLoading={!isDataLoaded}
        onVideoRef={getVideoRef}
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
