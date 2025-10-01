export interface ImageData {
  filename: string;
  date: string;
}

// Lazy load image data in chunks
export const loadImageChunk = async (chunkIndex: number): Promise<ImageData[]> => {
  const allData = await import('./gallery1040Images').then(module => module.imageData);

  const chunkSize = 50; // Load 50 images at a time
  const start = chunkIndex * chunkSize;
  const end = start + chunkSize;

  return allData.slice(start, end);
};

export const getTotalImageCount = async (): Promise<number> => {
  const allData = await import('./gallery1040Images').then(module => module.imageData);
  return allData.length;
};

export const loadAllImages = async (): Promise<ImageData[]> => {
  const allData = await import('./gallery1040Images').then(module => module.imageData);
  return allData;
};
