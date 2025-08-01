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

Images are stored in a hardcoded array with this structure:
```typescript
const imageData = [
  { filename: "250731/DUCTWORK_3.jpg", date: "July 31, 2025" },
  { filename: "250724/Windows_Agnes room_Install complete.jpg", date: "July 24, 2025" },
  // ... more images sorted newest first
]
```

Images are organized in date-based folders:
- `250731/` - July 31, 2025 (latest construction progress)
- `250724/` - July 24, 2025 (progress update)
- `250710/` - July 10, 2025 (windows and framing)
- `250618/` - June 18, 2025 (windows and electrical work)
- `250612/` - June 12, 2025 (library and framing)
- `250522/` - May 22, 2025 (framing progress)  
- `250508_250515/` - May 8-15, 2025 (initial work)
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

### Image Management

#### Main Portfolio Images
Located in `/public/images/`:
- Whodiss.png, 1040.jpg, Board.jpg, ios_integration.jpg, twitter_for_iphone.png, wap_browser.jpg, smtp_pop3_server.gif, SGI.jpg

#### 1040 Project Images
Located in `/public/images/1040/`:
- **Compressed Images**: All images optimized using sips tool with progressive compression (30-60% quality)
- **Backup Storage**: Original images stored in `/public/images/1040/backup/`
- **File Formats**: All images standardized to lowercase .jpg format
- **PDF Documents**: Design presentations stored in `/public/images/1040/documents/`
- **Optimization**: Images compressed based on size (>2MB = 30%, >1MB = 40%, >500KB = 50%, else 60%)

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
- **Lazy Loading**: Images load as they enter viewport using intersection observer
- **Preloading**: Critical images preloaded in HTML head
- **Caching**: Aggressive 1-year cache headers for static assets
- **Minification**: esbuild minification for optimal bundle size
- **Image Transitions**: Blur-to-sharp loading effects for better perceived performance

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
1. Add images to dated folder in `/public/images/1040/`
2. Update `imageData` array in Gallery1040.tsx with filename and date
3. Images are automatically included in progressive loading
4. Consider compression for large images (>800KB)

**Important Notes**: 
- The 1040 gallery uses a hardcoded image array, so code changes are required for new images
- Images are displayed in the order they appear in the `imageData` array (newest first)
- All image filenames must use lowercase .jpg extensions for consistency
- Dates should be specific (e.g., "July 31, 2025" not "July 2025") and match folder structure