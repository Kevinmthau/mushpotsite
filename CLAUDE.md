# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site inspired by mushpot.net, built with React + TypeScript + Vite. The site features a minimalist design with a horizontally scrolling image gallery showcasing project screenshots on a white background.

## Development Commands

- `npm run dev` - Start development server with hot reload at http://localhost:5173/
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Architecture

The application has a simple single-page architecture:

- **App.tsx**: Main component containing the image gallery
- **App.css**: All styling including responsive breakpoints
- **public/images/**: Project screenshots in specific order (Whodiss, 1040, Board, iOS Integration, Twitter for iPhone, WAP Browser, SMTP POP3, SGI)

### Image Gallery Design

The core feature is a horizontally scrolling image gallery with these characteristics:

- Images are center-aligned vertically using `align-items: center`
- Each image has a specific height defined by `.img-1` through `.img-8` classes
- Horizontal scrolling works page-wide, not just on the gallery container
- Scrollbars are hidden across all browsers
- Images maintain aspect ratio with `width: auto`

### Responsive Design

- Desktop: Full-size images with 40px gaps
- Tablet (≤768px): Scaled-down images with 20px gaps  
- Mobile (≤480px): Further reduced images with 15px gaps

All image proportions are maintained across breakpoints.

## Image Management

Project images in `/public/images/` are referenced in a specific order. When adding/removing images:

1. Update the image sources in App.tsx
2. Add corresponding `.img-X` classes in App.css with appropriate heights
3. Update responsive breakpoints to maintain proportional scaling

The current image order and sizing is intentionally curated for visual balance.