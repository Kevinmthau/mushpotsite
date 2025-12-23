# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site built with React + TypeScript + Vite. Features a homepage with horizontal scrolling Cover Flow gallery and a detailed 1040 construction project gallery. Deployed on Netlify.

## Development Commands

- `npm run dev` - Start development server at http://localhost:5173/
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

### File Structure

```
src/
├── components/
│   ├── HomePage/           # Cover Flow gallery with project thumbnails
│   │   ├── HomePage.tsx
│   │   ├── HomePage.css
│   │   └── index.ts
│   └── Gallery1040/        # Construction project gallery
│       ├── Gallery1040.tsx # Main orchestrator
│       ├── PDFSection.tsx  # PDF preview component
│       ├── GalleryGrid.tsx # Image grid with skeleton loading
│       ├── GalleryItem.tsx # Individual image/video item
│       ├── LoadMoreButton.tsx
│       ├── SkeletonItem.tsx
│       ├── Gallery1040.css
│       └── index.ts
├── hooks/
│   ├── useImageLoading.ts      # Async image data loading
│   └── useIntersectionObserver.ts  # Generic observer for lazy loading
├── utils/
│   └── imageUtils.ts           # formatImageName, isVideoFile, encodeImagePath
├── data/
│   ├── types.ts                # ImageData, HomePageItem interfaces
│   ├── gallery1040Images.ts    # 1040 gallery image list
│   └── homePageItems.ts        # Homepage project items
├── App.tsx                     # Router only
└── main.tsx
```

### Routes

- `/` - Homepage with Cover Flow gallery
- `/1040` - Construction project gallery

### Homepage Gallery

The Cover Flow gallery uses scroll-driven animations:
- Items defined in `src/data/homePageItems.ts`
- Size options: `small`, `medium`, `large`, `xlarge` (or default)
- Special props: `noReflect` (removes reflection), `extraSpacing` (adds margin)
- Responsive breakpoints at 768px and 480px

### 1040 Gallery

Progressive loading gallery with:
- Image data in `src/data/gallery1040Images.ts`
- Initial load: 6 images, then 6 more on scroll/click
- Intersection observer for infinite scroll
- Video lazy loading support
- Skeleton loading placeholders

## Adding Content

### Homepage Projects

Edit `src/data/homePageItems.ts`:
```typescript
{
  type: 'link' | 'route' | 'div',  // link=external, route=internal, div=static
  href?: string,                    // for external links
  to?: string,                      // for internal routes
  src: string,                      // image path
  alt: string,
  size?: 'small' | 'medium' | 'large' | 'xlarge',
  noReflect?: boolean,              // removes CSS reflection
  extraSpacing?: boolean            // adds margin-right
}
```

### 1040 Gallery Images

1. Add images to `/public/images/1040/YYMMDD/` folder
2. Update `src/data/gallery1040Images.ts`:
```typescript
{ filename: "251204/image_name.jpg", date: "December 4, 2025" }
```

**Notes:**
- Filenames with spaces are auto-encoded
- Images display in array order (newest first)
- Videos (.mov, .mp4) are lazy-loaded

## Image Utilities

Located in `src/utils/imageUtils.ts`:
- `formatImageName(filename)` - Formats filename for display
- `isVideoFile(filename)` - Checks if file is video
- `encodeImagePath(basePath, filename)` - URL-encodes path with spaces

## Deployment

Netlify auto-deploys from GitHub. Config in `netlify.toml`:
- Build: `npm run build`
- Publish: `dist`
- Node 18
- 1-year cache headers
- SPA routing via `public/_redirects`
