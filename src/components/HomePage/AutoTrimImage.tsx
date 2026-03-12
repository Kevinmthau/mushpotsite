import { useEffect, useState } from 'react';
import type { CSSProperties, ImgHTMLAttributes, SyntheticEvent } from 'react';

type TrimMetrics = {
  leftRatio: number;
  widthRatio: number;
};

type AutoTrimImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
  className?: string;
};

const trimCache = new Map<string, TrimMetrics>();
const CORNER_VARIANCE_THRESHOLD = 36;
const PIXEL_DIFF_THRESHOLD = 28;
const REQUIRED_BACKGROUND_MATCH_RATIO = 0.96;
const MIN_TRIM_RATIO = 0.04;
const MIN_LIGHT_BACKGROUND_LUMINANCE = 214;

function getPixel(
  data: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
): [number, number, number, number] {
  const offset = (y * width + x) * 4;
  return [
    data[offset] ?? 0,
    data[offset + 1] ?? 0,
    data[offset + 2] ?? 0,
    data[offset + 3] ?? 0,
  ];
}

function colorDiff(
  a: [number, number, number, number],
  b: [number, number, number, number],
): number {
  return (
    Math.abs(a[0] - b[0]) +
    Math.abs(a[1] - b[1]) +
    Math.abs(a[2] - b[2]) +
    Math.abs(a[3] - b[3])
  );
}

function averageColor(
  colors: Array<[number, number, number, number]>,
): [number, number, number, number] {
  const total = colors.reduce(
    (acc, [r, g, b, a]) => {
      acc[0] += r;
      acc[1] += g;
      acc[2] += b;
      acc[3] += a;
      return acc;
    },
    [0, 0, 0, 0],
  );

  return [
    Math.round(total[0] / colors.length),
    Math.round(total[1] / colors.length),
    Math.round(total[2] / colors.length),
    Math.round(total[3] / colors.length),
  ];
}

function luminance([r, g, b]: [number, number, number, number]): number {
  return (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
}

function detectTrimMetrics(img: HTMLImageElement): TrimMetrics | null {
  const { naturalWidth, naturalHeight } = img;
  if (!naturalWidth || !naturalHeight) return null;

  const scale = Math.min(1, 256 / Math.max(naturalWidth, naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(naturalHeight * scale));

  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const insetX = Math.min(canvas.width - 1, Math.max(0, Math.floor(canvas.width * 0.02)));
  const insetY = Math.min(canvas.height - 1, Math.max(0, Math.floor(canvas.height * 0.02)));
  const cornerColors: Array<[number, number, number, number]> = [
    getPixel(data, canvas.width, insetX, insetY),
    getPixel(data, canvas.width, canvas.width - insetX - 1, insetY),
    getPixel(data, canvas.width, insetX, canvas.height - insetY - 1),
    getPixel(data, canvas.width, canvas.width - insetX - 1, canvas.height - insetY - 1),
  ];

  const backgroundColor = averageColor(cornerColors);
  const maxCornerVariance = cornerColors.reduce(
    (max, color) => Math.max(max, colorDiff(color, backgroundColor)),
    0,
  );

  if (maxCornerVariance > CORNER_VARIANCE_THRESHOLD) {
    return null;
  }

  const hasTransparentBackground = backgroundColor[3] < 32;
  const hasLightBackground = luminance(backgroundColor) >= MIN_LIGHT_BACKGROUND_LUMINANCE;

  if (!hasTransparentBackground && !hasLightBackground) {
    return null;
  }

  const yStep = Math.max(1, Math.floor(canvas.height / 80));

  const isBackgroundColumn = (x: number) => {
    let matchingPixels = 0;
    let totalSamples = 0;

    for (let y = 0; y < canvas.height; y += yStep) {
      totalSamples += 1;
      const pixel = getPixel(data, canvas.width, x, y);

      if (
        pixel[3] < 16 ||
        colorDiff(pixel, backgroundColor) <= PIXEL_DIFF_THRESHOLD
      ) {
        matchingPixels += 1;
      }
    }

    return matchingPixels / totalSamples >= REQUIRED_BACKGROUND_MATCH_RATIO;
  };

  let leftTrim = 0;
  while (leftTrim < canvas.width - 1 && isBackgroundColumn(leftTrim)) {
    leftTrim += 1;
  }

  let rightTrim = 0;
  while (
    rightTrim < canvas.width - leftTrim - 1 &&
    isBackgroundColumn(canvas.width - rightTrim - 1)
  ) {
    rightTrim += 1;
  }

  const totalTrimRatio = (leftTrim + rightTrim) / canvas.width;
  if (totalTrimRatio < MIN_TRIM_RATIO) {
    return null;
  }

  const contentWidth = Math.max(1, canvas.width - leftTrim - rightTrim);

  return {
    leftRatio: leftTrim / canvas.height,
    widthRatio: contentWidth / canvas.height,
  };
}

function AutoTrimImage({
  alt,
  className,
  onLoad,
  src,
  ...imgProps
}: AutoTrimImageProps) {
  const cacheKey = typeof src === 'string' ? src : '';
  const [trimMetrics, setTrimMetrics] = useState<TrimMetrics | null>(() => (
    cacheKey ? trimCache.get(cacheKey) ?? null : null
  ));

  useEffect(() => {
    setTrimMetrics(cacheKey ? trimCache.get(cacheKey) ?? null : null);
  }, [cacheKey]);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (cacheKey && !trimCache.has(cacheKey)) {
      const detectedMetrics = detectTrimMetrics(event.currentTarget);
      if (detectedMetrics) {
        trimCache.set(cacheKey, detectedMetrics);
        setTrimMetrics(detectedMetrics);
      }
    }

    onLoad?.(event);
  };

  const style = trimMetrics ? {
    '--trim-left-ratio': trimMetrics.leftRatio,
    '--trimmed-width-ratio': trimMetrics.widthRatio,
  } as CSSProperties : undefined;

  const frameClassName = [
    'media-frame',
    trimMetrics ? 'has-auto-trim' : null,
    className ?? null,
  ].filter(Boolean).join(' ');

  return (
    <div className={frameClassName} style={style}>
      <img
        {...imgProps}
        alt={alt}
        onLoad={handleLoad}
        src={src}
      />
    </div>
  );
}

export default AutoTrimImage;
