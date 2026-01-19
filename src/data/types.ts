export interface ImageData {
  filename: string;
  date: string;
}

interface HomePageItemBase {
  src: string;
  alt: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  noReflect?: boolean;
}

export type HomePageItem =
  | (HomePageItemBase & { type: 'link'; href: string })
  | (HomePageItemBase & { type: 'route'; to: string })
  | (HomePageItemBase & { type: 'div' })
  | (HomePageItemBase & { type: 'video'; videoSrc: string });
