import './Gallery1040.css'
import { useState, useEffect, useRef, useCallback } from 'react'

function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
}

const imageData = [
  // August 28, 2025 - Latest Progress
  { filename: "250828/10th_floor_guest_room_plumbing_and_framing_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_second_room_bathroom_pour_prep_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_2nd_room_walls_up_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_avit_closet_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_closet_and_primary_entry_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_corridor_and_panel_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_corridor_walls_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_ductowkr_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_gallery_prepped_for_wood_floors_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_guest_room_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_guest_room_walls_up_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_primary_entry_large.jpg", date: "August 28, 2025" },
  { filename: "250828/10th_floor_second_room_entry_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_room_conduit_channeling_2_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_room_conduit_channeling_3_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_room_conduit_channeling_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_room_existing_fireplace_(outlet_to_be_removed)_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_room_plumbing_complete,_wall_repair_starting_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_shower_large.jpg", date: "August 28, 2025" },
  { filename: "250828/agnes_tub_wall_large.jpg", date: "August 28, 2025" },
  { filename: "250828/dining_room_kitchen_wall_large.jpg", date: "August 28, 2025" },
  { filename: "250828/exterior_brick_color_match_2_large.jpg", date: "August 28, 2025" },
  { filename: "250828/exterior_brick_color_match_large.jpg", date: "August 28, 2025" },
  { filename: "250828/exterior_window_frame_match_large.jpg", date: "August 28, 2025" },
  { filename: "250828/family_room_ductwork_&_mep's__large.jpg", date: "August 28, 2025" },
  { filename: "250828/fireplace_brick_sample_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_ceiling_framing_and_ductwork_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_ceiling_study_for_speakers_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_demo'd_fireplace_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_kitchen_opening_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_opening_returns_2_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_opening_returns_large.jpg", date: "August 28, 2025" },
  { filename: "250828/gallery_plumbing_connection_&_speaker_probe_large.jpg", date: "August 28, 2025" },
  { filename: "250828/kitchen_walls_up,_ductwork_and_wire_pulls_large.jpg", date: "August 28, 2025" },
  { filename: "250828/kitchen_walls_up,_ductwork_complete_large.jpg", date: "August 28, 2025" },
  { filename: "250828/laundry_room_washer_dryer_boxes_large.jpg", date: "August 28, 2025" },
  { filename: "250828/library_ceiling_framing_2_large.jpg", date: "August 28, 2025" },
  { filename: "250828/library_ceiling_framing_large.jpg", date: "August 28, 2025" },
  { filename: "250828/mudroom_hallway_ductowrk_and_wire_pulls_large.jpg", date: "August 28, 2025" },
  { filename: "250828/mudroom_hallway_walls_up,_transom_framing_large.jpg", date: "August 28, 2025" },
  { filename: "250828/primary_bath_floor_poured!_large.jpg", date: "August 28, 2025" },
  { filename: "250828/primary_bath_floor_poured_2!!_large.jpg", date: "August 28, 2025" },
  { filename: "250828/primary_closet_walls_up,_ceiling_framed_large.jpg", date: "August 28, 2025" },

  // August 13, 2025 - Previous Progress
  { filename: "250813/10TH FL FRAMING & DRYWALL PROGRESS.jpeg", date: "August 13, 2025" },
  { filename: "250813/10TH FL PRIMARY BEDROOM DRYALL PROGRESS.jpeg", date: "August 13, 2025" },
  { filename: "250813/10TH FL STAIR LANDING SUBFLOOR.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL DEEP DOOR JAMB TO GREAT ROOM.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL ENTRY FOYER NEW DOOR OPENINGS.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL GREAT ROOM MOLDING PROFILE REVIEW.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL GREAT ROOM PROGRESS.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL PROGRESS OVERVIEW & DUCTWORK.jpeg", date: "August 13, 2025" },
  { filename: "250813/9TH FL TERRACE PAVERS & DRAIN CONDITION.jpeg", date: "August 13, 2025" },
  { filename: "250813/SIX PANEL DOOR PROFILE REVIEW.jpeg", date: "August 13, 2025" },

  // August 7, 2025 - Progress Update
  { filename: "250807/10th floor framing.jpg", date: "August 7, 2025" },
  { filename: "250807/10th floor sheetrock_corridor.jpg", date: "August 7, 2025" },
  { filename: "250807/10th floor sheetrock_guestroom.jpg", date: "August 7, 2025" },
  { filename: "250807/10th floor_sheetrock, power.jpg", date: "August 7, 2025" },
  { filename: "250807/10th floor_sheetrock, primary suite.jpg", date: "August 7, 2025" },
  { filename: "250807/10th floor_wood floor repair.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_Ductowrk, piping, electrical and low voltage ongoing.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_Ductwork and framing ongoing, family room.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_Framing in back bedroom.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_Framing, plumbing, wiring ongoing .jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_ceiling framing and ductwork_gallery 2.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_ceiling framing and ductwork_gallery.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_ceiling framing_gallery.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_gallery Door opening framing, ceiling framing.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_kitchen Wall framing, plumbing ongoing.jpg", date: "August 7, 2025" },
  { filename: "250807/9th floor_library Plumbing rough, BX wiring, door framing.jpg", date: "August 7, 2025" },
  { filename: "250807/9thfloor_Kitchen framing, ductowrk, and hvac units ongoing.jpg", date: "August 7, 2025" },

  // July 31, 2025 - Progress Update
  { filename: "250731/SHEETROCK, POWER_10TH FLOOR CORRIDOR.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_PRIMARY CLOSET.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_DINING ROOM TO KITCHEN.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_AGNES ROOM INTO NEW BABY ROOM.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_10TH FLOOR CORRIDOR 2.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_10TH FLOOR BACK BATHROOM AND LINEN CLOSET.jpg", date: "July 31, 2025" },
  { filename: "250731/SHEETROCK_10TH FL CORRIDOR.jpg", date: "July 31, 2025" },
  { filename: "250731/PLUMBING RUNS_PRIMARY BATHROOM.jpg", date: "July 31, 2025" },
  { filename: "250731/KITCHEN_DAMAGED SHAFT REMOVED.jpg", date: "July 31, 2025" },
  { filename: "250731/GUEST ROOM_10TH FLOOR.jpg", date: "July 31, 2025" },
  { filename: "250731/FRAMING, PATCHING ELECTRIC_PRIMARY BATHROOM 2.jpg", date: "July 31, 2025" },
  { filename: "250731/FRAMING, PATCHING ELECTRIC_PRIMARY BATHROOM 1.jpg", date: "July 31, 2025" },
  { filename: "250731/FRAMING_AGNES CLOSET (SMALLER).jpg", date: "July 31, 2025" },
  { filename: "250731/FRAMING AND MEPS_10TH FLOOR BACK ROOM.jpg", date: "July 31, 2025" },
  { filename: "250731/FLOORING_10TH FLOOR GALLERY 2.jpg", date: "July 31, 2025" },
  { filename: "250731/FLOORING_10TH FLOOR GALLERY 1.jpg", date: "July 31, 2025" },
  { filename: "250731/ELECTRICAL_OLD PANEL BEING REMOVED NEXT WEEK.jpg", date: "July 31, 2025" },
  { filename: "250731/ELECTRICAL_NEW PANEL WIRED!.jpg", date: "July 31, 2025" },
  { filename: "250731/ELECTRICAL_NEW PANEL 9TH FLOOR.jpg", date: "July 31, 2025" },
  { filename: "250731/ELECTRICAL PANEL_10TH FLOOR.jpg", date: "July 31, 2025" },
  { filename: "250731/DUCTWORK_4.jpg", date: "July 31, 2025" },
  { filename: "250731/DUCTWORK_3.jpg", date: "July 31, 2025" },
  { filename: "250731/DUCTWORK_2.jpg", date: "July 31, 2025" },
  { filename: "250731/DUCTWORK_1.jpg", date: "July 31, 2025" },
  { filename: "250731/CORE DRILLING_ALL 15 ARE COMPLETE.jpg", date: "July 31, 2025" },

  // July 24, 2025 - Progress Update
  { filename: "250724/Windows_Agnes room_Install complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_GUest room_Complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_Guest bath_complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_Laundry room_Complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_Future bedroom_Install complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_Family room_complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Windows_9th fl back bedroom_complete.jpg", date: "July 24, 2025" },
  { filename: "250724/Walls up!_Blocked in old primary openings.jpg", date: "July 24, 2025" },
  { filename: "250724/Walls up!_10th floor gallery and primary entry.jpg", date: "July 24, 2025" },
  { filename: "250724/Walls up!_10th floor gallery and primary entry 2.jpg", date: "July 24, 2025" },
  { filename: "250724/Walls up!_10th floor corridor.jpg", date: "July 24, 2025" },
  { filename: "250724/Site condition_cracking wall to be removed and rebuilt.jpg", date: "July 24, 2025" },
  { filename: "250724/Site condition 2_Existing plumbing through beams.jpg", date: "July 24, 2025" },
  { filename: "250724/Site Condition 2_Cracking wall to be rebuild.jpg", date: "July 24, 2025" },
  { filename: "250724/Sheetrock! 10th floor corridor.jpg", date: "July 24, 2025" },
  { filename: "250724/Plumbing_9th floor back bathroom.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_MEP's_9th floor.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_9th fl Back bedroom and bathroom.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_10th floor rooms .jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_10th floor 4.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_10th floor 3.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing_10th floor 2.jpg", date: "July 24, 2025" },
  { filename: "250724/Framing and electrical_9th floor.jpg", date: "July 24, 2025" },
  { filename: "250724/Electrical runs_9th floor.jpg", date: "July 24, 2025" },
  { filename: "250724/Electrical panel wiring.jpg", date: "July 24, 2025" },
  { filename: "250724/Ductwork_main gallery.jpg", date: "July 24, 2025" },
  { filename: "250724/Ductwork_main gallery 2.jpg", date: "July 24, 2025" },
  { filename: "250724/Ductwork_family room.jpg", date: "July 24, 2025" },
  { filename: "250724/Ductwork_Kitchen.jpg", date: "July 24, 2025" },
  { filename: "250724/Doors installed_Kitchen.jpg", date: "July 24, 2025" },
  { filename: "250724/Doors installed_Back terrace.jpg", date: "July 24, 2025" },
  { filename: "250724/Back stair.jpg", date: "July 24, 2025" },
  { filename: "250724/Agnes bathroom_walls patched and repaired.jpg", date: "July 24, 2025" },
  { filename: "250724/Agens bathroom_Power runs.jpg", date: "July 24, 2025" },

  // July 10, 2025 - Windows and Framing
  { filename: "250710/Windows! 9th floor 1.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows! 9th floor 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows! 9th floor 3.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows!_10th floor 1.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows!_10th floor 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows!_10th floor 3.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows!_10th floor 4.jpg", date: "July 10, 2025" },
  { filename: "250710/Windows_Ready for install.jpg", date: "July 10, 2025" },
  { filename: "250710/Wire pulls.jpg", date: "July 10, 2025" },
  { filename: "250710/Window Install_Sidewalk shed.jpg", date: "July 10, 2025" },
  { filename: "250710/Subfloor_9th floor 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Subfloor_9th floor 1.jpg", date: "July 10, 2025" },
  { filename: "250710/Stair demolished.jpg", date: "July 10, 2025" },
  { filename: "250710/Plumbing_10th primary bath.jpg", date: "July 10, 2025" },
  { filename: "250710/Materials.jpg", date: "July 10, 2025" },
  { filename: "250710/Materials 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th primary bath.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 8.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 7.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 6.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 5.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 4.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 3.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_10th floor 1.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing_ 10th Primary closet.jpg", date: "July 10, 2025" },
  { filename: "250710/Framing and subfloor_9th floor.jpg", date: "July 10, 2025" },
  { filename: "250710/Floor infill and radiator piping complete_3.jpg", date: "July 10, 2025" },
  { filename: "250710/Floor infill and radiator piping complete_2.jpg", date: "July 10, 2025" },
  { filename: "250710/Floor infill and radiator piping complete_1.jpg", date: "July 10, 2025" },
  { filename: "250710/Finish samples_both flooring (repair, new).jpg", date: "July 10, 2025" },
  { filename: "250710/Finish samples_Library 2.jpg", date: "July 10, 2025" },
  { filename: "250710/Finish samples_Library 1.jpg", date: "July 10, 2025" },
  { filename: "250710/Finish samples_First round.jpg", date: "July 10, 2025" },
  { filename: "250710/Finish samples_1.jpg", date: "July 10, 2025" },
  { filename: "250710/Electrical wiring to panel.jpg", date: "July 10, 2025" },
  
  // June 18, 2025 - Windows and Electrical
  { filename: "250618/Windows!_Primary Suite.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_Primary Bedroom.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_More 10th Floor.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_Mezz.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_Library.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_Gallery.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_Family Room Area.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_9th Floor Spare Room.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_10th Floor.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_10th Floor Bedrooms.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_10th Floor Bedrooms 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_10th Floor Back area.jpg", date: "June 18, 2025" },
  { filename: "250618/Windows!_10th Floor 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Parging_Agnes Bathroom.jpg", date: "June 18, 2025" },
  { filename: "250618/Gallery_Door Openings Framed.jpg", date: "June 18, 2025" },
  { filename: "250618/Gallery_Door Openings Framed 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring_Layouts Noted 3.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring_Layouts Noted 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring_Layouts Noted 1.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring_10th Fl Subfloor 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring_10th Fl Subfloor 1.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring, Framing and Windows_Guest Room.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring and Framing_Primary Closet.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring and Framing_Primary Closet 2.jpg", date: "June 18, 2025" },
  { filename: "250618/Flooring and Framing_10th floor Bedrooms.jpg", date: "June 18, 2025" },
  { filename: "250618/Electrical Wiring_4.jpg", date: "June 18, 2025" },
  { filename: "250618/Electrical Wiring_3.jpg", date: "June 18, 2025" },
  { filename: "250618/Electrical Wiring_2.jpg", date: "June 18, 2025" },
  { filename: "250618/Electrical Wiring_1.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_7.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_6.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_5.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_4.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_3.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_2.jpg", date: "June 18, 2025" },
  { filename: "250618/Concrete and Fireproofing Repair_1.jpg", date: "June 18, 2025" },
  
  // June 12, 2025 - Library and Framing
  { filename: "250612/LIBRARY MILLWORK MOCKUP_1.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_2.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_3.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY MILLWORK MOCKUP_4.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 1.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 2.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WALL FRAMING! 3.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_SUBFLOOR PREP.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 1.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 2.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 3.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 4.jpg", date: "June 12, 2025" },
  { filename: "250612/10TH FLOOR_WOOD FLOORING SLEEPER REPAIR 5.jpg", date: "June 12, 2025" },
  { filename: "250612/DINING ROOM_EXPANDED OPENING TO KITCHEN.jpg", date: "June 12, 2025" },
  { filename: "250612/DINING ROOM_NEW RADIATOR BRANCH PIPING.jpg", date: "June 12, 2025" },
  { filename: "250612/GREAT ROOM_EXPANDED OPENINGS.jpg", date: "June 12, 2025" },
  { filename: "250612/GREAT ROOM_OPENINGS.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY_NEW RADIATOR BRANCH PIPING 1.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY_NEW RADIATOR BRANCH PIPING 2.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY_WALL FRAMING 1.jpg", date: "June 12, 2025" },
  { filename: "250612/LIBRARY_WALL FRAMING 2.jpg", date: "June 12, 2025" },
  { filename: "250612/PRIMARY BATH_WALL AND FLOOR PREP.jpg", date: "June 12, 2025" },
  { filename: "250612/PRIMARY BEDROOM_FRAMING OPENINGS 2.jpg", date: "June 12, 2025" },
  { filename: "250612/PRIMARY BEDROOM_FRAMING OPENINGS.jpg", date: "June 12, 2025" },
  { filename: "250612/STAIR DETAIL_1.jpg", date: "June 12, 2025" },
  { filename: "250612/STAIR DETAIL_2.jpg", date: "June 12, 2025" },
  
  // May 22, 2025 - Framing Progress
  { filename: "250522/10TH FL METAL FRAMING PROGRESS.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL DINING RM.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS - NORTH.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS - SOUTH.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL DOOR OPENINGS DEMO.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL LIVING RM WALL PANELING REMOVED - NORTH WALL.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL LIVING RM WALL PANELING REMOVED - SOUTH WALL.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL LIVING RM.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO DETAIL 2.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO DETAIL.jpg", date: "May 22, 2025" },
  { filename: "250522/9TH FL STAIR CLOSET DEMO PROGRESS.jpg", date: "May 22, 2025" },
  
  // May 8-15, 2025 - Initial Work
  { filename: "250508_250515/0515_Work on kitchen floor.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Vestibule opened up.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Sleepers exposed, being tested.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Primary bedroom.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Primary bath sleepers ready for testing.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_More layouts.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_More layouts 2.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Mezz.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Layouts beginning.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Flooring sub testing and replacing sleepers.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 2.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 3.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0515_Asbestos, missing sleepers to be added at all windows 4.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Upstairs sleeper inspection, radiator removal.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Under stair.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Under stair to be removed.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Stair.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Primary bath.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Primary bath patching.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Primary bath exposing and testing sleepers.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Mezz.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Guest bedroom radiator work.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Great room.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Great room radiator work.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Framing materials_kitchen and radiator demo.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Framing materials, kitchen demo.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Expanded openings.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Expanded openings 2.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Dining radiator work.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/0508_Back room sleepers exposed.jpg", date: "May 8-15, 2025" },
  { filename: "250508_250515/IMG_0471.jpg", date: "May 8-15, 2025" },
  
  // May 2025 - Original Images
  { filename: "SR GAMBREL FLOOR SAMPLE.jpg", date: "May 2025" },
  { filename: "SALVAGED HARDWARE FOR SRG REVIEW.jpg", date: "May 2025" },
  { filename: "MAIN STAIRCASE MOLDING DETAIL.jpg", date: "May 2025" },
  { filename: "9TH FL STUDY.jpg", date: "May 2025" },
  { filename: "9TH FL REAR HALL STAIR DETAIL.jpg", date: "May 2025" },
  { filename: "9TH FL REAR HALL CEILING.jpg", date: "May 2025" },
  { filename: "9TH FL PLAYROOM.jpg", date: "May 2025" },
  { filename: "9TH FL MAIN STAIR OVERVIEW.jpg", date: "May 2025" },
  { filename: "9TH FL MAIN FOYER SOUTH.jpg", date: "May 2025" },
  { filename: "9TH FL LIBRARY FLOORING UNDER MILLWORK.jpg", date: "May 2025" },
  { filename: "9TH FL KITCHEN DEMO OVERVIEW.jpg", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM.jpg", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM MOLDING DETAILS.jpg", date: "May 2025" },
  { filename: "9TH FL GREAT ROOM CEILING DETAIL.jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM STEAM PIPING.jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM OVERVIEW.jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM OVERVIEW (2).jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION.jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION (3).jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FLOORING CONDITION (2).jpg", date: "May 2025" },
  { filename: "9TH FL DINING ROOM FIREPLACE SURROUND.jpg", date: "May 2025" },
  { filename: "10TH FL THRESHHOLD DETAIL.jpg", date: "May 2025" },
  { filename: "10TH FL STAIR LANDING OVERVIEW.jpg", date: "May 2025" },
  { filename: "10TH FL STAIR LANDING FLOOR CONDITION.jpg", date: "May 2025" },
  { filename: "10TH FL SALVAGED DOORS.jpg", date: "May 2025" },
  { filename: "10TH FL REAR STAIRCASE.jpg", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM.jpg", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (5).jpg", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (4).jpg", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (3).jpg", date: "May 2025" },
  { filename: "10TH FL PRIMARY BEDROOM (2).jpg", date: "May 2025" },
  { filename: "10TH FL DEMO OVERVIEW.jpg", date: "May 2025" },
  { filename: "10TH FL DEMO OVERVIEW (2).jpg", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 OVERVIEW.jpg", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 OVERVIEW (2).jpg", date: "May 2025" },
  { filename: "10TH FL BEDROOM 2 FLOORING CONDITION.jpg", date: "May 2025" },
  { filename: "10TH FL BEDROOM 1 OVERVIEW.jpg", date: "May 2025" },
  { filename: "10TH FL BEDROOM 1 FLOORING CONDITION.jpg", date: "May 2025" },
  { filename: "10TH FL BATH 1 OVERVIEW.jpg", date: "May 2025" },
  { filename: "Window protection and air filtration.jpg", date: "May 2025" },
  { filename: "Window Protection and ceiling.jpg", date: "May 2025" },
  { filename: "Mezz Demo'ed.jpg", date: "May 2025" },
  { filename: "Library opening.jpg", date: "May 2025" },
  { filename: "Kitchen floor and mezzanine.jpg", date: "May 2025" },
  { filename: "Great Room Doors Demo'ed.jpg", date: "May 2025" },
  { filename: "Gallery openings expanded.jpg", date: "May 2025" },
  { filename: "Dining room, kitchen and mezz view.jpg", date: "May 2025" },
  { filename: "Dining room demo'ed.jpg", date: "May 2025" },
  { filename: "Baby bathroom demo'ed.jpg", date: "May 2025" },
  { filename: "10th floor primary closet and guest room demo'ed.jpg", date: "May 2025" },
  { filename: "10th floor elevator vestibule demo'ed.jpg", date: "May 2025" },
  { filename: "10th floor demo'ed - various rooms.jpg", date: "May 2025" }
].filter(item => !item.filename.toLowerCase().endsWith('.mov'));

function formatImageName(filename: string) {
  const nameWithoutPath = filename.split('/').pop() || filename;
  return nameWithoutPath.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
}

function Gallery1040() {
  const [visibleImages, setVisibleImages] = useState(6) // Reduced back to 6 for faster initial load
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sortedImages = imageData.slice() // Already sorted newest first
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(isMobileDevice())
  }, [])

  const loadMoreImages = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 6, sortedImages.length))
      setIsLoading(false)
    }, 100)
  }, [isLoading, sortedImages.length])

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleImages < sortedImages.length) {
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
  }, [loadMoreImages, visibleImages, sortedImages.length])

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
        {sortedImages.slice(0, visibleImages).map((imageItem, index) => (
          <div className="gallery-item" key={imageItem.filename}>
            <div className="image-container">
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
        <div className="load-more-container" ref={loadMoreRef}>
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