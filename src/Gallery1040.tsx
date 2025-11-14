import './Gallery1040.css'
import { useState, useEffect, useRef, useCallback } from 'react'

// Lazy load the image data to enable code splitting
const loadImageData = () => import('./data/gallery1040Images').then(module => module.imageData);

function formatImageName(filename: string) {
  const nameWithoutPath = filename.split('/').pop() || filename;
  return nameWithoutPath.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
}

function isVideoFile(filename: string) {
  const videoExtensions = ['.mov', '.mp4', '.webm', '.ogg'];
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

function getOptimizedImageUrl(filename: string, width: number = 1200, quality: number = 80) {
  // Use Netlify Image CDN for automatic optimization and WebP conversion
  const imagePath = `/images/1040/${filename}`;
  return `/.netlify/images?url=${encodeURIComponent(imagePath)}&w=${width}&q=${quality}`;
}

function Gallery1040() {
  const [visibleImages, setVisibleImages] = useState(6) // Reduced from 12 for faster initial load
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState<Array<{filename: string, date: string}>>([])
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  // Load image data asynchronously - non-blocking
  useEffect(() => {
    // Load data in background
    loadImageData().then(data => {
      setImageData(data)
    })
  }, [])

  const loadMoreImages = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 6, imageData.length))
      setIsLoading(false)
    }, 100)
  }, [isLoading, imageData.length])

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleImages < imageData.length) {
          loadMoreImages()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before the element comes into view
      }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loadMoreImages, visibleImages, imageData.length])

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            const src = video.dataset.src
            if (src && !loadedVideos.has(src)) {
              video.src = src
              video.load()
              setLoadedVideos(prev => new Set(prev).add(src))
              videoObserver.unobserve(video)
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '200px'
      }
    )

    videoRefs.current.forEach((video) => {
      if (video) {
        videoObserver.observe(video)
      }
    })

    return () => {
      videoObserver.disconnect()
    }
  }, [visibleImages, loadedVideos])
  
  // Render skeleton UI while data loads (non-blocking)
  const showingSkeleton = imageData.length === 0

  return (
    <div className="gallery-app">
      {/* PDF Document Section */}
      <div className="pdf-section">
        <div className="pdf-container">
          <div className="pdf-preview">
            <a 
              href="/images/1040/documents/2025_0623 1040FifthAve9-10C DesignPresentation.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pdf-cover-link"
              title="Click to view Design Presentation PDF"
            >
              <img 
                src="/images/1040/documents/pdf-cover.jpg"
                alt="Design Presentation - Click to view PDF"
                className="pdf-cover-image"
              />
              <div className="pdf-overlay">
                <span className="pdf-overlay-text">View Design Presentation</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="gallery-grid">
        {showingSkeleton ? (
          // Show skeleton placeholders while data loads
          Array.from({ length: 6 }).map((_, index) => (
            <div className="gallery-item" key={`skeleton-${index}`}>
              <div className="image-container skeleton">
                <div className="skeleton-image"></div>
              </div>
              <div className="caption">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-date"></div>
              </div>
            </div>
          ))
        ) : (
          imageData.slice(0, visibleImages).map((imageItem, index) => (
            <div className="gallery-item" key={imageItem.filename}>
              <div className="image-container">
                {isVideoFile(imageItem.filename) ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current.set(imageItem.filename, el)
                      }
                    }}
                    data-src={`/images/1040/${imageItem.filename}`}
                    controls
                    preload="none"
                    className="gallery-image"
                    onLoadedData={(e) => {
                      e.currentTarget.classList.add('loaded')
                    }}
                    onError={(e) => {
                      e.currentTarget.classList.add('error')
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={getOptimizedImageUrl(imageItem.filename, 1200, 80)}
                    srcSet={`${getOptimizedImageUrl(imageItem.filename, 800, 80)} 800w, ${getOptimizedImageUrl(imageItem.filename, 1200, 80)} 1200w, ${getOptimizedImageUrl(imageItem.filename, 1600, 80)} 1600w`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={imageItem.filename}
                    width="800"
                    height="600"
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 3 ? "high" : "low"}
                    className="gallery-image"
                    onLoad={(e) => {
                      e.currentTarget.classList.add('loaded')
                    }}
                    onError={(e) => {
                      e.currentTarget.classList.add('error')
                    }}
                  />
                )}
              </div>
              <div className="caption">
                <div className="image-title">{formatImageName(imageItem.filename)}</div>
                <div className="image-date">{imageItem.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {visibleImages < imageData.length && (
        <div className="load-more-container" ref={loadMoreRef}>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <button className="load-more-btn" onClick={loadMoreImages}>
              Load More Images ({imageData.length - visibleImages} remaining)
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Gallery1040