import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const GALLERY_ROOT = path.join(PUBLIC_DIR, 'images', '1040');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const VIDEO_EXTENSIONS = new Set(['.mov', '.mp4', '.webm', '.ogg']);

function parseGalleryFilenames() {
  const sourcePath = path.join(ROOT, 'src', 'data', 'gallery1040Images.ts');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const regex = /"([^"\n]+\.[^"\n]+)"/g;
  const filenames = [];

  for (const match of source.matchAll(regex)) {
    const value = match[1];
    const ext = path.extname(value).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)) {
      filenames.push(value);
    }
  }

  return filenames;
}

function validateGalleryFiles() {
  const missing = [];

  for (const filename of parseGalleryFilenames()) {
    const ext = path.extname(filename).toLowerCase();
    const originalPath = path.join(GALLERY_ROOT, filename);

    if (VIDEO_EXTENSIONS.has(ext)) {
      if (!fs.existsSync(originalPath)) {
        missing.push(`Missing video: /images/1040/${filename}`);
      }
      continue;
    }

    const webpPath = path.join(
      GALLERY_ROOT,
      filename.replace(/\.[^/.]+$/, '.webp')
    );

    if (!fs.existsSync(webpPath) && !fs.existsSync(originalPath)) {
      missing.push(`Missing image (neither webp nor original): /images/1040/${filename}`);
    }
  }

  return missing;
}

function parsePreloadHrefs() {
  const htmlPath = path.join(ROOT, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const linkTagRegex = /<link\b[^>]*>/gi;
  const hrefs = [];

  for (const tagMatch of html.matchAll(linkTagRegex)) {
    const tag = tagMatch[0];
    if (!/\brel=["']preload["']/i.test(tag)) continue;
    if (!/\bas=["']image["']/i.test(tag)) continue;

    const hrefMatch = tag.match(/\bhref=["']([^"']+)["']/i);
    if (!hrefMatch) continue;

    hrefs.push(hrefMatch[1]);
  }

  return hrefs;
}

function validatePreloads() {
  const missing = [];

  for (const href of parsePreloadHrefs()) {
    if (!href.startsWith('/')) continue;

    const cleanHref = href.split(/[?#]/)[0];
    const filePath = path.join(PUBLIC_DIR, cleanHref.slice(1));

    if (!fs.existsSync(filePath)) {
      missing.push(`Missing preloaded image: ${href}`);
    }
  }

  return missing;
}

const errors = [
  ...validateGalleryFiles(),
  ...validatePreloads(),
];

if (errors.length > 0) {
  console.error('Media integrity check failed:\n');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

console.log('Media integrity check passed.');
