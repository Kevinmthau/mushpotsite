# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site inspired by mushpot.net, built with React + TypeScript + Vite. The site features two main sections: a homepage with a horizontal scrolling gallery of project thumbnails, and a detailed 1040 project gallery. The site is deployed on Netlify with CDN optimizations.

## Development Commands

- `npm run dev` - Start development server with hot reload at http://localhost:5173/
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Development Tools

- **Vite**: Build tool with optimized chunk splitting and esbuild minification
- **TypeScript**: Strict type checking with React types
- **ESLint**: Code linting with React hooks and refresh rules
- **React Router**: Client-side routing for SPA navigation
- **CSS Optimization**: Automatic minification and caching

## Architecture

### Routing Structure

The application uses React Router with two main routes:
- `/` - Homepage with horizontal scrolling project gallery
- `/1040` - Detailed 1040 project construction gallery

### Key Components

- **App.tsx**: Main router component with routes for HomePage and Gallery1040
- **HomePage** (in App.tsx): Main portfolio page with horizontal scrolling project thumbnails
- **Gallery1040.tsx**: Detailed construction project gallery with progressive loading
- **Gallery1040.css**: Dedicated styles for the 1040 gallery

### Homepage Gallery Design

The homepage features a horizontally scrolling image gallery with these characteristics:
- Images are center-aligned vertically using `align-items: center`
- Each image has a specific height defined by `.img-1` through `.img-8` classes
- Horizontal scrolling works page-wide, not just on the gallery container
- Scrollbars are hidden across all browsers
- Images maintain aspect ratio with `width: auto`
- Lazy loading implemented for all images except the first (Whodiss)
- Async decoding to prevent UI blocking

**Important Links**: 
- First image (Whodiss) links to TestFlight: `https://testflight.apple.com/join/NHg9cY9W`
- Second image (1040) links to `/1040` route using React Router Link

### 1040 Gallery Architecture

The 1040 project gallery (`/1040`) is a sophisticated image gallery featuring:

- **PDF Document Section**: Design presentation PDF displayed at top with embedded viewer and fallback download link
- **Progressive Loading**: Loads 12 images initially, then loads 6 more on scroll or button click
- **Chronological Sorting**: Images sorted newest first (July 2025 → May 2025)
- **Date-based Organization**: Images grouped by construction phases with dates
- **Performance Optimizations**: Lazy loading, blur-to-sharp transitions, shimmer effects, intersection observer
- **Responsive Grid Layout**: 3 columns on desktop, 1 column on mobile

#### Image Data Structure

Images are stored in a separate data file at `src/data/gallery1040Images.ts` with this structure:
```typescript
export const imageData: ImageData[] = [
  { filename: "251106/10 fl_Agnes Bathroom.JPEG", date: "November 6, 2025" },
  { filename: "250731/DUCTWORK_3.jpg", date: "July 31, 2025" },
  // ... more images sorted newest first
]
```

The data is lazy-loaded via dynamic import for code splitting optimization.

Images are organized in date-based folders using `YYMMDD` format:
- `251106/` - November 6, 2025 (latest construction progress)
- `251030/` - October 30, 2025
- `250930/` - September 30, 2025
- `250731/` - July 31, 2025
- Older dates follow the same pattern
- Root folder - May 2025 (original documentation)

#### PDF Document Section

The gallery includes a PDF viewer at the top displaying the design presentation:
- **Location**: `/public/images/1040/documents/2025_0623 1040FifthAve9-10C DesignPresentation.pdf`
- **Implementation**: HTML5 `<embed>` element with responsive design
- **Fallback**: Direct download link for browsers without PDF support
- **Styling**: Consistent with gallery design (rounded corners, shadows, minimal padding)

#### Progressive Loading Implementation

- **Initial Load**: 6 images with first 3 prioritized (`fetchPriority="high"`, `loading="eager"`)
- **Intersection Observer**: Auto-loads 6 more images when scrolling near bottom (100px margin)  
- **Manual Loading**: "Load More" button shows remaining image count
- **Loading States**: Shimmer placeholders and spinning loader during image loading
- **Smooth Transitions**: Blur-to-sharp transitions when images load (2px blur → 0px)

### Image Orientation and Loading

**Critical Implementation Details**:
- Images use direct file paths (not Netlify CDN) to preserve EXIF orientation data
- No hardcoded width/height attributes on `<img>` tags - allows natural aspect ratios for both portrait and landscape
- URL encoding handles filenames with spaces: `filename.split('/').map(encodeURIComponent).join('/')`
- CSS uses `object-fit: contain` and `width: 100%, height: auto` for proper scaling
- Failed image loads show as grayscale (`.gallery-image.error { filter: grayscale(100%) }`)

**Common Issues**:
- If images appear sideways: Check for hardcoded width/height attributes
- If images show as black & white: Check filename encoding (spaces need URL encoding)
- Portrait vs landscape: Never assume aspect ratio - let images display at natural dimensions

### Image Management

#### Main Portfolio Images
Located in `/public/images/`:
- Whodiss.png, 1040.jpg, Board.jpg, ios_integration.jpg, twitter_for_iphone.png, wap_browser.jpg, smtp_pop3_server.gif, SGI.jpg

#### 1040 Project Images
Located in `/public/images/1040/`:
- **Direct Image Loading**: Images use direct paths with URL encoding for filenames containing spaces
- **URL Encoding**: Filenames are automatically encoded using `encodeURIComponent` to handle spaces and special characters
- **File Formats**: Mix of .jpg, .jpeg, and .JPEG extensions (case-sensitive on some systems)
- **PDF Documents**: Design presentations stored in `/public/images/1040/documents/`
- **Video Support**: .MOV and .mov files supported via lazy loading
- **Backup Storage**: Original images may be stored in `/public/images/1040/backup/`

### Image Compression Workflow

When adding new images to the 1040 gallery:
1. Place images in dated folders using `YYMMDD` format (e.g., `250731/` for July 31, 2025)
2. Use `comprehensive_image_optimization.sh` script for bulk optimization
3. Update `imageData` array in Gallery1040.tsx with filename and specific date
4. All images should use lowercase .jpg extensions for consistency
5. Images are automatically optimized by Netlify CDN on deployment

**Available optimization scripts**:
- `comprehensive_image_optimization.sh` - Full optimization with progressive compression
- Individual sips commands for single images: `sips -s format jpeg -s formatOptions [quality] [input] --out [output]`

### Responsive Design

- **Desktop**: Full-size images with 40px gaps (homepage), 3-column grid (1040)
- **Tablet (≤768px)**: Scaled-down images with 20px gaps, 1-column grid
- **Mobile (≤480px)**: Further reduced images with 15px gaps

### Performance Optimizations

- **Netlify CDN**: Automatic image compression and WebP conversion with `Vary: Accept` header
- **Chunk Splitting**: Vendor libraries cached separately via Vite config
- **Lazy Loading**: Images and videos load as they enter viewport using intersection observer
- **Video Lazy Loading**: Videos use `preload="none"` and only load when scrolled into view (200px margin)
- **Modern Image Formats**: Picture element with WebP sources and JPEG fallbacks
- **Video Optimization**: Support for multiple formats (WebM, MP4) with automatic format selection
- **Video Posters**: Poster images reduce initial load and provide preview thumbnails
- **Preloading**: Critical images preloaded in HTML head
- **Caching**: Aggressive 1-year cache headers for static assets
- **Minification**: esbuild minification for optimal bundle size
- **Image Transitions**: Blur-to-sharp loading effects for better perceived performance

### Media Optimization Script

The project includes an optimization script at `scripts/optimize-media.sh` that can:
- Convert JPG/JPEG images to WebP format (85% quality)
- Convert MOV videos to optimized MP4 (H.264, CRF 23)
- Convert videos to WebM format (VP9)
- Generate poster images for videos
- Show file size comparisons and savings

**Requirements**: Install `ffmpeg` and `webp` tools via Homebrew:
```bash
brew install ffmpeg webp
```

**Usage**:
```bash
# Optimize all media in 1040 folder
./scripts/optimize-media.sh

# Optimize specific directory
./scripts/optimize-media.sh public/images/1040/250930
```

The gallery component automatically uses WebP images and optimized video formats when available, falling back to original formats if not present.

## Deployment

The site is deployed on Netlify with automatic deployments from GitHub:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18 (specified in netlify.toml)
- **Image Optimization**: Automatic compression and WebP conversion via Netlify's CDN
- **Security Headers**: XSS protection, frame options, content-type sniffing prevention
- **SPA Support**: Client-side routing handled by `public/_redirects`
- **Cache Headers**: 1-year caching for assets, images, JS, CSS, and fonts
- **WebP Support**: Automatic WebP serving to supporting browsers via `Vary: Accept` header

**Configuration**: All deployment settings are defined in `netlify.toml`

## Adding New Images

### For Homepage Portfolio
1. Add image to `/public/images/`
2. Update App.tsx with new image reference
3. Add corresponding `.img-X` class in App.css
4. Update responsive breakpoints

### For 1040 Gallery
1. Add images to dated folder in `/public/images/1040/` using `YYMMDD` format (e.g., `251106/`)
2. Update `imageData` array in `src/data/gallery1040Images.ts` with filename and specific date
3. Images are automatically included in progressive loading
4. Consider compression for large images (>800KB)

**Important Notes**:
- The 1040 gallery image list is in `src/data/gallery1040Images.ts`, so code changes are required for new images
- Images are displayed in the order they appear in the `imageData` array (newest first)
- Filenames with spaces are automatically URL-encoded (e.g., "10 fl_Agnes Bathroom.JPEG" works correctly)
- File extensions can be .jpg, .jpeg, or .JPEG (mixed case is supported)
- Dates should be specific (e.g., "November 6, 2025" not "November 2025") and match folder structure
- Image data is lazy-loaded via dynamic import for better initial page performance