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
            src={encodeImagePath('/images/1040', item.filename)}
            alt={item.filename}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "low"}
            className={`gallery-image ${loadState}`}
            onLoad={() => setLoadState('loaded')}
            onError={() => {
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
