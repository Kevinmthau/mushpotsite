import type { RefCallback } from 'react';
import type { ImageData } from '../../data/types';
import GalleryItem from './GalleryItem';
import SkeletonItem from './SkeletonItem';

interface GalleryGridProps {
  imageData: ImageData[];
  visibleCount: number;
  isLoading: boolean;
  onVideoRef?: (filename: string) => RefCallback<HTMLVideoElement>;
}

function GalleryGrid({ imageData, visibleCount, isLoading, onVideoRef }: GalleryGridProps) {
  const showSkeleton = isLoading && imageData.length === 0;

  return (
    <div className="gallery-grid">
      {showSkeleton ? (
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonItem key={`skeleton-${index}`} />
        ))
      ) : (
        imageData.slice(0, visibleCount).map((item, index) => (
          <GalleryItem
            key={item.filename}
            item={item}
            index={index}
            onVideoRef={onVideoRef?.(item.filename)}
          />
        ))
      )}
    </div>
  );
}

export default GalleryGrid;
