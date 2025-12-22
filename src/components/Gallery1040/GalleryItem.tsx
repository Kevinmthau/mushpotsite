import type { RefCallback } from 'react';
import type { ImageData } from '../../data/types';
import { formatImageName, isVideoFile, encodeImagePath } from '../../utils/imageUtils';

interface GalleryItemProps {
  item: ImageData;
  index: number;
  onVideoRef?: RefCallback<HTMLVideoElement>;
}

function GalleryItem({ item, index, onVideoRef }: GalleryItemProps) {
  const isVideo = isVideoFile(item.filename);

  return (
    <div className="gallery-item">
      <div className="image-container">
        {isVideo ? (
          <video
            ref={onVideoRef}
            data-src={`/images/1040/${item.filename}`}
            controls
            preload="none"
            className="gallery-image"
            onLoadedData={(e) => {
              e.currentTarget.classList.add('loaded');
            }}
            onError={(e) => {
              e.currentTarget.classList.add('error');
            }}
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
            className="gallery-image"
            onLoad={(e) => {
              e.currentTarget.classList.add('loaded');
            }}
            onError={(e) => {
              e.currentTarget.classList.add('error');
              console.error('Failed to load image:', item.filename, 'URL:', e.currentTarget.src);
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
}

export default GalleryItem;
