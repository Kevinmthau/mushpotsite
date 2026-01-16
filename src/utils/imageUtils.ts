/**
 * Formats an image filename for display by removing path and extension
 */
export function formatImageName(filename: string): string {
  const nameWithoutPath = filename.split('/').pop() || filename;
  return nameWithoutPath.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
}

/**
 * Checks if a filename is a video file based on extension
 */
const VIDEO_EXTENSIONS = new Set(['.mov', '.mp4', '.webm', '.ogg']);

export function isVideoFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return VIDEO_EXTENSIONS.has(ext);
}

/**
 * Encodes an image path for use in URLs, handling spaces and special characters
 */
export function encodeImagePath(basePath: string, filename: string): string {
  return `${basePath}/${filename.split('/').map(encodeURIComponent).join('/')}`;
}
