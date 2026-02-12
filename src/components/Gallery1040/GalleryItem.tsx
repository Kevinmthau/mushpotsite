import { memo, useState, type RefCallback } from 'react';
import type { ImageData } from '../../data/types';
import { formatImageName, isVideoFile, encodeImagePath } from '../../utils/imageUtils';

interface GalleryItemProps {
  item: ImageData;
  index: number;
  onVideoRef?: RefCallback<HTMLVideoElement>;
}

const GalleryItem = memo(function GalleryItem({ item, index, onVideoRef }: GalleryItemProps) {
  const isVideo = isVideoFile(item.filename);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const isAlreadyWebp = item.filename.toLowerCase().endsWith('.webp');
  const webpFilename = isAlreadyWebp
    ? item.filename
    : item.filename.replace(/\.[^/.]+$/, '.webp');
  const originalSrc = encodeImagePath('/images/1040', item.filename);
  const webpSrc = encodeImagePath('/images/1040', webpFilename);
  const [imgSrc, setImgSrc] = useState(isAlreadyWebp ? originalSrc : webpSrc);

  return (
    <div className="gallery-item">
      <div className="image-container">
        {isVideo ? (
          <video
            ref={onVideoRef}
            data-src={`/images/1040/${item.filename}`}
            controls
            preload="none"
            className={`gallery-image ${loadState}`}
            onLoadedData={() => setLoadState('loaded')}
            onError={() => setLoadState('error')}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={imgSrc}
            alt={item.filename}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "low"}
            className={`gallery-image ${loadState}`}
            onLoad={() => setLoadState('loaded')}
            onError={() => {
              if (imgSrc === webpSrc && webpSrc !== originalSrc) {
                setImgSrc(originalSrc);
                setLoadState('loading');
                return;
              }
              setLoadState('error');
              console.error('Failed to load image:', item.filename);
            }}
          />
        )}
      </div>
      <div className="caption">
        <div className="image-title">{formatImageName(item.filename)}</div>
        <div className="image-date">{item.date}</div>
      </div>
    </div>
  );
});

export default GalleryItem;
