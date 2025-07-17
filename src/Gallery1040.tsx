import './Gallery1040.css'
import { useState, useEffect } from 'react'

const imageFilenames = [
  "SR GAMBREL FLOOR SAMPLE.JPEG",
  "SALVAGED HARDWARE FOR SRG REVIEW.JPEG",
  "MAIN STAIRCASE MOLDING DETAIL.JPEG",
  "9TH FL STUDY.JPEG",
  "9TH FL REAR HALL STAIR DETAIL.JPEG",
  "9TH FL REAR HALL CEILING.JPEG",
  "9TH FL PLAYROOM.JPEG",
  "9TH FL MAIN STAIR OVERVIEW.JPEG",
  "9TH FL MAIN FOYER SOUTH.JPEG",
  "9TH FL LIBRARY FLOORING UNDER MILLWORK.JPEG",
  "9TH FL KITCHEN DEMO OVERVIEW.JPEG",
  "9TH FL GREAT ROOM.JPEG",
  "9TH FL GREAT ROOM MOLDING DETAILS.JPEG",
  "9TH FL GREAT ROOM CEILING DETAIL.JPEG",
  "9TH FL DINING ROOM STEAM PIPING.JPEG",
  "9TH FL DINING ROOM OVERVIEW.JPEG",
  "9TH FL DINING ROOM OVERVIEW (2).JPEG",
  "9TH FL DINING ROOM FLOORING CONDITION.JPEG",
  "9TH FL DINING ROOM FLOORING CONDITION (3).JPEG",
  "9TH FL DINING ROOM FLOORING CONDITION (2).JPEG",
  "9TH FL DINING ROOM FIREPLACE SURROUND.JPEG",
  "10TH FL THRESHHOLD DETAIL.JPEG",
  "10TH FL STAIR LANDING OVERVIEW.JPEG",
  "10TH FL STAIR LANDING FLOOR CONDITION.JPEG",
  "10TH FL SALVAGED DOORS.JPEG",
  "10TH FL REAR STAIRCASE.JPEG",
  "10TH FL PRIMARY BEDROOM.JPEG",
  "10TH FL PRIMARY BEDROOM (5).JPEG",
  "10TH FL PRIMARY BEDROOM (4).JPEG",
  "10TH FL PRIMARY BEDROOM (3).JPEG",
  "10TH FL PRIMARY BEDROOM (2).JPEG",
  "10TH FL DEMO OVERVIEW.JPEG",
  "10TH FL DEMO OVERVIEW (2).JPEG",
  "10TH FL BEDROOM 2 OVERVIEW.JPEG",
  "10TH FL BEDROOM 2 OVERVIEW (2).JPEG",
  "10TH FL BEDROOM 2 FLOORING CONDITION.JPEG",
  "10TH FL BEDROOM 1 OVERVIEW.JPEG",
  "10TH FL BEDROOM 1 FLOORING CONDITION.JPEG",
  "10TH FL BATH 1 OVERVIEW.JPEG",
  "Window protection and air filtration.HEIC",
  "Window Protection and ceiling.HEIC",
  "Mezz Demo'ed.HEIC",
  "Library opening.HEIC",
  "Kitchen floor and mezzanine.HEIC",
  "Great Room Doors Demo'ed.HEIC",
  "Gallery openings expanded.HEIC",
  "Dining room, kitchen and mezz view.HEIC",
  "Dining room demo'ed.HEIC",
  "Baby bathroom demo'ed.HEIC",
  "10th floor primary closet and guest room demo'ed.HEIC",
  "10th floor elevator vestibule demo'ed.HEIC",
  "10th floor demo'ed - various rooms.HEIC"
].filter(name => !name.toLowerCase().endsWith('.mov'));

function stripExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, "");
}

function Gallery1040() {
  const [visibleImages, setVisibleImages] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const reversedImages = imageFilenames.slice().reverse()

  const loadMoreImages = () => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 6, reversedImages.length))
      setIsLoading(false)
    }, 100)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loadMoreImages()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, visibleImages, reversedImages.length])

  return (
    <div className="gallery-app">
      <a 
        href="https://github.com/Kevinmthau/mushpotsite/commit/b85ff57" 
        target="_blank" 
        rel="noopener noreferrer"
        className="gallery-link"
      >
        <div className="gallery-grid">
          {reversedImages.slice(0, visibleImages).map((filename, index) => (
            <div className="gallery-item" key={filename}>
              <div className="image-container">
                <img
                  src={`/images/1040/${filename}`}
                  alt={filename}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index < 3 ? "high" : "low"}
                  onLoad={(e) => {
                    e.currentTarget.classList.add('loaded')
                  }}
                />
                <div className="image-placeholder"></div>
              </div>
              <div className="caption">{stripExtension(filename)}</div>
            </div>
          ))}
        </div>
        {visibleImages < reversedImages.length && (
          <div className="load-more-container">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <button className="load-more-btn" onClick={loadMoreImages}>
                Load More Images ({reversedImages.length - visibleImages} remaining)
              </button>
            )}
          </div>
        )}
      </a>
    </div>
  )
}

export default Gallery1040