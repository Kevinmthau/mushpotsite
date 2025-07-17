# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site inspired by mushpot.net, built with React + TypeScript + Vite. The site features two main sections: a homepage with a horizontal scrolling gallery of project thumbnails, and a detailed 1040 project gallery. The site is deployed on Netlify with CDN optimizations.

## Development Commands

- `npm run dev` - Start development server with hot reload at http://localhost:5173/
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

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

Images are stored in a hardcoded array with this structure:
```typescript
const imageData = [
  { filename: "250612/LIBRARY_WALL_FRAMING_1.HEIC", date: "June 2025" },
  // ... more images
]
```

Images are organized in date-based folders:
- `250710/` - July 2025 (latest construction progress)
- `250618/` - June 2025 (windows and electrical work)
- `250612/` - June 2025 (library and framing)
- `250522/` - May 2025 (framing progress)  
- `250508_250515/` - May 2025 (initial work)
- Root folder - May 2025 (original documentation)

#### PDF Document Section

The gallery includes a PDF viewer at the top displaying the design presentation:
- **Location**: `/public/images/1040/documents/2025_0623 1040FifthAve9-10C DesignPresentation.pdf`
- **Implementation**: HTML5 `<embed>` element with responsive design
- **Fallback**: Direct download link for browsers without PDF support
- **Styling**: Consistent with gallery design (rounded corners, shadows, minimal padding)

#### Progressive Loading Implementation

- **Initial Load**: 12 images with first 6 prioritized (`fetchPriority="high"`, `loading="eager"`)
- **Intersection Observer**: Auto-loads 6 more images when scrolling near bottom (200px margin)
- **Manual Loading**: "Load More" button shows remaining image count
- **Loading States**: Shimmer placeholders and spinning loader during image loading
- **Smooth Transitions**: Blur-to-sharp transitions when images load (2px blur → 0px)

### Image Management

#### Main Portfolio Images
Located in `/public/images/`:
- Whodiss.png, 1040.jpg, Board.jpg, ios_integration.jpg, twitter_for_iphone.png, wap_browser.jpg, smtp_pop3_server.gif, SGI.jpg

#### 1040 Project Images
Located in `/public/images/1040/`:
- **Compressed Images**: All images compressed using sips tool (64% size reduction)
- **Backup Storage**: Original images stored in `/public/images/1040/backup/`
- **Total Size**: ~57MB (compressed from ~159MB)
- **File Formats**: JPEG and HEIC images
- **PDF Documents**: Design presentations stored in `/public/images/1040/documents/`

### Image Compression Workflow

When adding new images to the 1040 gallery:
1. Place images in dated folders (e.g., `250612/`)
2. Run compression script if images are >800KB
3. Update `imageData` array in Gallery1040.tsx
4. Images are automatically optimized by Netlify CDN

### Responsive Design

- **Desktop**: Full-size images with 40px gaps (homepage), 3-column grid (1040)
- **Tablet (≤768px)**: Scaled-down images with 20px gaps, 1-column grid
- **Mobile (≤480px)**: Further reduced images with 15px gaps

### Performance Optimizations

- **Netlify CDN**: Automatic image compression and WebP conversion with `Vary: Accept` header
- **Chunk Splitting**: Vendor libraries cached separately via Vite config
- **Lazy Loading**: Images load as they enter viewport using intersection observer
- **Preloading**: Critical images preloaded in HTML head
- **Caching**: Aggressive 1-year cache headers for static assets
- **Minification**: esbuild minification for optimal bundle size
- **Image Transitions**: Blur-to-sharp loading effects for better perceived performance

## Deployment

The site is deployed on Netlify with automatic deployments from GitHub:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Image Optimization**: Automatic compression via Netlify's CDN
- **Security Headers**: XSS protection, frame options, content-type sniffing prevention
- **SPA Support**: Client-side routing handled by `public/_redirects`

## Adding New Images

### For Homepage Portfolio
1. Add image to `/public/images/`
2. Update App.tsx with new image reference
3. Add corresponding `.img-X` class in App.css
4. Update responsive breakpoints

### For 1040 Gallery
1. Add images to dated folder in `/public/images/1040/`
2. Update `imageData` array in Gallery1040.tsx with filename and date
3. Images are automatically included in progressive loading
4. Consider compression for large images (>800KB)

**Note**: The 1040 gallery uses a hardcoded image array, so code changes are required for new images. Images are displayed in the order they appear in the `imageData` array (newest first).