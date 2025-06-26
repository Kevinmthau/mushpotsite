import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification with esbuild (default, faster than terser)
    minify: 'esbuild',
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Generate source maps for production debugging
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
  },
  // Optimize images during development
  assetsInclude: ['**/*.webp', '**/*.avif'],
})
