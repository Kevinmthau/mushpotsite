# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site inspired by mushpot.net, built with React + TypeScript + Vite. The site features a minimalist design with a horizontally scrolling image gallery showcasing project screenshots on a white background. The site is deployed on Netlify with CDN optimizations.

## Development Commands

- `npm run dev` - Start development server with hot reload at http://localhost:5173/
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Architecture

The application has a simple single-page architecture:

- **App.tsx**: Main component containing the image gallery with performance optimizations
- **App.css**: All styling including responsive breakpoints and mobile optimizations
- **public/images/**: Project screenshots in specific order (Whodiss, 1040, Board, iOS Integration, Twitter for iPhone, WAP Browser, SMTP POP3, SGI)
- **netlify.toml**: Deployment configuration with CDN caching and image optimization
- **vite.config.ts**: Build optimizations including chunk splitting and minification

### Image Gallery Design

The core feature is a horizontally scrolling image gallery with these characteristics:

- Images are center-aligned vertically using `align-items: center`
- Each image has a specific height defined by `.img-1` through `.img-8` classes
- Horizontal scrolling works page-wide, not just on the gallery container
- Scrollbars are hidden across all browsers
- Images maintain aspect ratio with `width: auto`
- Lazy loading implemented for all images except the first
- Async decoding to prevent UI blocking

### Responsive Design

- Desktop: Full-size images with 40px gaps
- Tablet (≤768px): Scaled-down images (280-340px heights) with 20px gaps  
- Mobile (≤480px): Further reduced images (180-300px heights) with 15px gaps

All image proportions are maintained across breakpoints. Mobile images were specifically sized larger than initial implementation for better visibility.

### Performance Optimizations

- **Netlify CDN**: Automatic image compression and optimization
- **Chunk Splitting**: Vendor libraries cached separately via Vite config
- **Lazy Loading**: Images load as they enter viewport
- **Preloading**: Critical images (Whodiss, 1040) preloaded in HTML head
- **Caching**: Aggressive 1-year cache headers for static assets
- **Minification**: esbuild minification for optimal bundle size

## Deployment

The site is deployed on Netlify with automatic deployments from GitHub. Key deployment features:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Image Optimization**: Automatic compression via Netlify's CDN
- **Security Headers**: XSS protection, frame options, content-type sniffing prevention
- **SPA Support**: Redirects configured in `public/_redirects`

## Image Management

Project images in `/public/images/` are referenced in a specific order. When adding/removing images:

1. Update the image sources in App.tsx (maintain lazy loading attributes)
2. Add corresponding `.img-X` classes in App.css with appropriate heights
3. Update responsive breakpoints to maintain proportional scaling
4. Consider updating preload hints in index.html for critical images

**Important**: The first image (Whodiss) is clickable and links to TestFlight. Maintain this functionality when updating.

The current image order and sizing is intentionally curated for visual balance. Images are automatically optimized by Netlify's CDN during serving.