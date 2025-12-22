export interface ImageData {
  filename: string;
  date: string;
}

export interface HomePageItem {
  type: 'link' | 'route' | 'div';
  href?: string;
  to?: string;
  external?: boolean;
  src: string;
  webp?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}
