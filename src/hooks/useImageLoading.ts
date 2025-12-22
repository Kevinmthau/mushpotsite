import { useState, useEffect } from 'react';
import type { ImageData } from '../data/types';

/**
 * Hook to lazy load image data for code splitting
 */
export function useImageLoading() {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    import('../data/gallery1040Images').then(module => {
      setImageData(module.imageData);
      setIsDataLoaded(true);
    });
  }, []);

  return { imageData, isDataLoaded };
}
