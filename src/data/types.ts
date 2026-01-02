export interface ImageData {
  filename: string;
  date: string;
}

interface HomePageItemBase {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  noReflect?: boolean;
  extraSpacing?: boolean;
  wideSpacing?: boolean;
  tightSpacing?: boolean;
}

export type HomePageItem =
  | (HomePageItemBase & { type: 'link'; href: string })
  | (HomePageItemBase & { type: 'route'; to: string })
  | (HomePageItemBase & { type: 'div' });
