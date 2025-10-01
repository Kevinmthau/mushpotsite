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

function Gallery1040() {
  const [visibleImages, setVisibleImages] = useState(12) // Show more images initially to display August 28 photos
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState<Array<{filename: string, date: string}>>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())
  
  // Load image data asynchronously
  useEffect(() => {
    loadImageData().then(data => {
      setImageData(data)
      setDataLoaded(true)
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
              // Load video sources
              const sources = video.querySelectorAll('source[data-src]')
              sources.forEach((source) => {
                const srcElement = source as HTMLSourceElement
                const sourceSrc = srcElement.dataset.src
                if (sourceSrc) {
                  srcElement.src = sourceSrc
                }
              })

              // If no sources, load video src directly
              if (sources.length === 0) {
                video.src = src
              }

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
  
  // Show loading state while data is being fetched
  if (!dataLoaded) {
    return (
      <div className="gallery-app">
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading gallery...</div>
      </div>
    )
  }

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
        {imageData.slice(0, visibleImages).map((imageItem, index) => (
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
                  poster={`/images/1040/${imageItem.filename.replace(/\.(mov|mp4|webm|ogg)$/i, '_poster.jpg')}`}
                  controls
                  preload="none"
                  className="gallery-image"
                  onLoadedData={(e) => {
                    const video = e.currentTarget
                    video.classList.add('loaded')
                    video.style.filter = 'blur(0px)'
                  }}
                  onError={(e) => {
                    e.currentTarget.classList.add('error')
                  }}
                  style={{
                    filter: 'blur(2px)',
                    transition: 'filter 0.3s ease-out'
                  }}
                >
                  <source data-src={`/images/1040/${imageItem.filename.replace(/\.(mov|mp4)$/i, '.webm')}`} type="video/webm" />
                  <source data-src={`/images/1040/${imageItem.filename.replace(/\.mov$/i, '.mp4')}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <picture>
                  <source
                    srcSet={`/images/1040/${imageItem.filename.replace(/\.(jpg|jpeg)$/i, '.webp')}`}
                    type="image/webp"
                  />
                  <img
                    src={`/images/1040/${imageItem.filename}`}
                    alt={imageItem.filename}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 3 ? "high" : "low"}
                    className="gallery-image"
                    onLoad={(e) => {
                      const img = e.currentTarget
                      img.classList.add('loaded')
                      // Remove blur effect when image loads
                      img.style.filter = 'blur(0px)'
                    }}
                    onError={(e) => {
                      e.currentTarget.classList.add('error')
                    }}
                    style={{
                      filter: 'blur(2px)',
                      transition: 'filter 0.3s ease-out'
                    }}
                  />
                </picture>
              )}
              <div className="image-placeholder"></div>
            </div>
            <div className="caption">
              <div className="image-title">{formatImageName(imageItem.filename)}</div>
              <div className="image-date">{imageItem.date}</div>
            </div>
          </div>
        ))}
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