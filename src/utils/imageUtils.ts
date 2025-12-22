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
export function isVideoFile(filename: string): boolean {
  const videoExtensions = ['.mov', '.mp4', '.webm', '.ogg'];
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

/**
 * Encodes an image path for use in URLs, handling spaces and special characters
 */
export function encodeImagePath(basePath: string, filename: string): string {
  return `${basePath}/${filename.split('/').map(encodeURIComponent).join('/')}`;
}
