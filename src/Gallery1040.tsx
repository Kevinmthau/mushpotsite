import './Gallery1040.css'
import { useState, useEffect } from 'react'

const imageData = [
  // July 2025 - Latest Progress
  { filename: "250710/Windows! 9th floor 1.HEIC", date: "July 2025" },
  { filename: "250710/Windows! 9th floor 2.HEIC", date: "July 2025" },
  { filename: "250710/Windows! 9th floor 3.HEIC", date: "July 2025" },
  { filename: "250710/Windows!_10th floor 1.HEIC", date: "July 2025" },
  { filename: "250710/Windows!_10th floor 2.HEIC", date: "July 2025" },
  { filename: "250710/Windows!_10th floor 3.HEIC", date: "July 2025" },
  { filename: "250710/Windows!_10th floor 4.HEIC", date: "July 2025" },
  { filename: "250710/Windows_Ready for install.HEIC", date: "July 2025" },
  { filename: "250710/Wire pulls.HEIC", date: "July 2025" },
  { filename: "250710/Window Install_Sidewalk shed.HEIC", date: "July 2025" },
  { filename: "250710/Subfloor_9th floor 2.HEIC", date: "July 2025" },
  { filename: "250710/Subfloor_9th floor 1.HEIC", date: "July 2025" },
  { filename: "250710/Stair demolished.HEIC", date: "July 2025" },
  { filename: "250710/Plumbing_10th primary bath.HEIC", date: "July 2025" },
  { filename: "250710/Materials.HEIC", date: "July 2025" },
  { filename: "250710/Materials 2.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th primary bath.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 8.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 7.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 6.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 5.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 4.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 3.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 2.HEIC", date: "July 2025" },
  { filename: "250710/Framing_10th floor 1.HEIC", date: "July 2025" },
  { filename: "250710/Framing_ 10th Primary closet.HEIC", date: "July 2025" },
  { filename: "250710/Framing and subfloor_9th floor.HEIC", date: "July 2025" },
  { filename: "250710/Floor infill and radiator piping complete_3.HEIC", date: "July 2025" },
  { filename: "250710/Floor infill and radiator piping complete_2.HEIC", date: "July 2025" },
  { filename: "250710/Floor infill and radiator piping complete_1.HEIC", date: "July 2025" },
  { filename: "250710/Finish samples_both flooring (repair, new).HEIC", date: "July 2025" },
  { filename: "250710/Finish samples_Library 2.HEIC", date: "July 2025" },
  { filename: "250710/Finish samples_Library 1.HEIC", date: "July 2025" },
  { filename: "250710/Finish samples_First round.HEIC", date: "July 2025" },
  { filename: "250710/Finish samples_1.HEIC", date: "July 2025" },
  { filename: "250710/Electrical wiring to panel.HEIC", date: "July 2025" },
  
  // June 2025 - Windows and Electrical
  { filename: "250618/Windows!_Primary Suite.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_Primary Bedroom.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_More 10th Floor.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_Mezz.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_Library.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_Gallery.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_Family Room Area.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_9th Floor Spare Room.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_10th Floor.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_10th Floor Bedrooms.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_10th Floor Bedrooms 2.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_10th Floor Back area.HEIC", date: "June 2025" },
  { filename: "250618/Windows!_10th Floor 2.HEIC", date: "June 2025" },
  { filename: "250618/Parging_Agnes Bathroom.HEIC", date: "June 2025" },
  { filename: "250618/Gallery_Door Openings Framed.HEIC", date: "June 2025" },
  { filename: "250618/Gallery_Door Openings Framed 2.HEIC", date: "June 2025" },
  { filename: "250618/Flooring_Layouts Noted 3.HEIC", date: "June 2025" },
  { filename: "250618/Flooring_Layouts Noted 2.HEIC", date: "June 2025" },
  { filename: "250618/Flooring_Layouts Noted 1.HEIC", date: "June 2025" },
  { filename: "250618/Flooring_10th Fl Subfloor 2.HEIC", date: "June 2025" },
  { filename: "250618/Flooring_10th Fl Subfloor 1.HEIC", date: "June 2025" },
  { filename: "250618/Flooring, Framing and Windows_Guest Room.HEIC", date: "June 2025" },
  { filename: "250618/Flooring and Framing_Primary Closet.HEIC", date: "June 2025" },
  { filename: "250618/Flooring and Framing_Primary Closet 2.HEIC", date: "June 2025" },
  { filename: "250618/Flooring and Framing_10th floor Bedrooms.HEIC", date: "June 2025" },
  { filename: "250618/Electrical Wiring_4.HEIC", date: "June 2025" },
  { filename: "250618/Electrical Wiring_3.HEIC", date: "June 2025" },
  { filename: "250618/Electrical Wiring_2.HEIC", date: "June 2025" },
  { filename: "250618/Electrical Wiring_1.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_7.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_6.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_5.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_4.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_3.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_2.HEIC", date: "June 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_1.HEIC", date: "June 2025" },
  
  // June 2025 - Library and Framing
  { filename: "250612/LIBRARY MILLWORK MOCKUP_1.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_2.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_3.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_4.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 1.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 2.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 3.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_SUBFLOOR PREP.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 1.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 2.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 3.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 4.HEIC", date: "June 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 5.HEIC", date: "June 2025" },
  { filename: "250612/DINING ROOM_EXPANDED OPENING TO KITCHEN.HEIC", date: "June 2025" },
  { filename: "250612/DINING ROOM_NEW RADIATOR BRANCH PIPING.HEIC", date: "June 2025" },
  { filename: "250612/GREAT ROOM_EXPANDED OPENINGS.HEIC", date: "June 2025" },
  { filename: "250612/GREAT ROOM_OPENINGS.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY_NEW RADIATOR BRANCH PIPING 1.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY_NEW RADIATOR BRANCH PIPING 2.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY_WALL FRAMING 1.HEIC", date: "June 2025" },
  { filename: "250612/LIBRARY_WALL FRAMING 2.HEIC", date: "June 2025" },
  { filename: "250612/PRIMARY BATH_WALL AND FLOOR PREP.HEIC", date: "June 2025" },
  { filename: "250612/PRIMARY BEDROOM_FRAMING OPENINGS 2.HEIC", date: "June 2025" },
  { filename: "250612/PRIMARY BEDROOM_FRAMING OPENINGS.HEIC", date: "June 2025" },
  { filename: "250612/STAIR DETAIL_1.HEIC", date: "June 2025" },
  { filename: "250612/STAIR DETAIL_2.HEIC", date: "June 2025" },
  
  // May 2025 - Framing Progress
  { filename: "250522/10TH FL METAL FRAMING PROGRESS.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL DINING RM.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS - NORTH.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS - SOUTH.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS DEMO.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL LIVING RM WALL PANELING REMOVED - NORTH WALL.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL LIVING RM WALL PANELING REMOVED - SOUTH WALL.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL LIVING RM.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO DETAIL 2.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO DETAIL.JPEG", date: "May 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO PROGRESS.JPEG", date: "May 2025" },
  
  // May 2025 - Initial Work
  { filename: "250508_250515/0515_Work on kitchen floor.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Vestibule opened up.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Sleepers exposed, being tested.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Primary bedroom.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Primary bath sleepers ready for testing.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_More layouts.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_More layouts 2.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Mezz.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Layouts beginning.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Flooring sub testing and replacing sleepers.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 2.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 3.HEIC", date: "May 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 4.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Upstairs sleeper inspection, radiator removal.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Under stair.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Under stair to be removed.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Stair.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Primary bath.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Primary bath patching.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Primary bath exposing and testing sleepers.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Mezz.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Guest bedroom radiator work.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Great room.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Great room radiator work.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Framing materials_kitchen and radiator demo.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Framing materials, kitchen demo.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Expanded openings.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Expanded openings 2.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Dining radiator work.HEIC", date: "May 2025" },
  { filename: "250508_250515/0508_Back room sleepers exposed.HEIC", date: "May 2025" },
  { filename: "250508_250515/IMG_0471.HEIC", date: "May 2025" },
  
  // May 2025 - Original Images
  { filename: "SR GAMBREL FLOOR SAMPLE.JPEG", date: "May 2025" },
  { filename: "SALVAGED HARDWARE FOR SRG REVIEW.JPEG", date: "May 2025" },
  { filename: "MAIN STAIRCASE MOLDING DETAIL.JPEG", date: "May 2025" },
  { filename: "9TH FL STUDY.JPEG", date: "May 2025" },
  { filename: "9TH FL REAR HALL STAIR DETAIL.JPEG", date: "May 2025" },
  { filename: "9TH FL REAR HALL CEILING.JPEG", date: "May 2025" },
  { filename: "9TH FL PLAYROOM.JPEG", date: "May 2025" },
  { filename: "9TH FL MAIN STAIR OVERVIEW.JPEG", date: "May 2025" },
  { filename: "9TH FL MAIN FOYER SOUTH.JPEG", date: "May 2025" },
  { filename: "9TH FL LIBRARY FLOORING UNDER MILLWORK.JPEG", date: "May 2025" },
  { filename: "9TH FL KITCHEN DEMO OVERVIEW.JPEG", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM.JPEG", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM MOLDING DETAILS.JPEG", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM CEILING DETAIL.JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM STEAM PIPING.JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM OVERVIEW.JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM OVERVIEW (2).JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION.JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION (3).JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION (2).JPEG", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FIREPLACE SURROUND.JPEG", date: "May 2025" },
  { filename: "10TH FL THRESHHOLD DETAIL.JPEG", date: "May 2025" },
  { filename: "10TH FL STAIR LANDING OVERVIEW.JPEG", date: "May 2025" },
  { filename: "10TH FL STAIR LANDING FLOOR CONDITION.JPEG", date: "May 2025" },
  { filename: "10TH FL SALVAGED DOORS.JPEG", date: "May 2025" },
  { filename: "10TH FL REAR STAIRCASE.JPEG", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM.JPEG", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (5).JPEG", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (4).JPEG", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (3).JPEG", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (2).JPEG", date: "May 2025" },
  { filename: "10TH FL DEMO OVERVIEW.JPEG", date: "May 2025" },
  { filename: "10TH FL DEMO OVERVIEW (2).JPEG", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 OVERVIEW.JPEG", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 OVERVIEW (2).JPEG", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 FLOORING CONDITION.JPEG", date: "May 2025" },
  { filename: "10TH FL BEDROOM 1 OVERVIEW.JPEG", date: "May 2025" },
  { filename: "10TH FL BEDROOM 1 FLOORING CONDITION.JPEG", date: "May 2025" },
  { filename: "10TH FL BATH 1 OVERVIEW.JPEG", date: "May 2025" },
  { filename: "Window protection and air filtration.HEIC", date: "May 2025" },
  { filename: "Window Protection and ceiling.HEIC", date: "May 2025" },
  { filename: "Mezz Demo'ed.HEIC", date: "May 2025" },
  { filename: "Library opening.HEIC", date: "May 2025" },
  { filename: "Kitchen floor and mezzanine.HEIC", date: "May 2025" },
  { filename: "Great Room Doors Demo'ed.HEIC", date: "May 2025" },
  { filename: "Gallery openings expanded.HEIC", date: "May 2025" },
  { filename: "Dining room, kitchen and mezz view.HEIC", date: "May 2025" },
  { filename: "Dining room demo'ed.HEIC", date: "May 2025" },
  { filename: "Baby bathroom demo'ed.HEIC", date: "May 2025" },
  { filename: "10th floor primary closet and guest room demo'ed.HEIC", date: "May 2025" },
  { filename: "10th floor elevator vestibule demo'ed.HEIC", date: "May 2025" },
  { filename: "10th floor demo'ed - various rooms.HEIC", date: "May 2025" }
].filter(item => !item.filename.toLowerCase().endsWith('.mov'));

function formatImageName(filename: string) {
  const nameWithoutPath = filename.split('/').pop() || filename;
  return nameWithoutPath.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
}

function Gallery1040() {
  const [visibleImages, setVisibleImages] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const sortedImages = imageData.slice() // Already sorted newest first

  const loadMoreImages = () => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 6, sortedImages.length))
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
  }, [isLoading, visibleImages, sortedImages.length])

  return (
    <div className="gallery-app">
      <div className="gallery-grid">
        {sortedImages.slice(0, visibleImages).map((imageItem, index) => (
          <div className="gallery-item" key={imageItem.filename}>
            <div className="image-container">
              <img
                src={`/images/1040/${imageItem.filename}`}
                alt={imageItem.filename}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 3 ? "high" : "low"}
                onLoad={(e) => {
                  e.currentTarget.classList.add('loaded')
                }}
              />
              <div className="image-placeholder"></div>
            </div>
            <div className="caption">
              <div className="image-title">{formatImageName(imageItem.filename)}</div>
              <div className="image-date">{imageItem.date}</div>
            </div>
          </div>
        ))}
      </div>
      {visibleImages < sortedImages.length && (
        <div className="load-more-container">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <button className="load-more-btn" onClick={loadMoreImages}>
              Load More Images ({sortedImages.length - visibleImages} remaining)
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Gallery1040