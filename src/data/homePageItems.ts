import type { HomePageItem } from './types';

export const homePageItems: HomePageItem[] = [
  { type: 'link', href: 'http://board.fun', external: true, src: '/images/Board.jpg', webp: '/images/Board.webp', alt: 'Board', size: 'medium' },
  { type: 'div', src: '/images/ESC-Co-Logo.png', alt: 'ESC App', size: 'small' },
  { type: 'link', href: 'https://testflight.apple.com/join/VppMNjcA', external: true, src: '/images/Whodiss.jpg', webp: '/images/Whodiss.webp', alt: 'Whodiss', size: 'small' },
  { type: 'route', to: '/1040', src: '/images/1040.jpg', webp: '/images/1040.webp', alt: '1040', size: 'large' },
  { type: 'div', src: '/images/32689-1280 2.jpg', alt: 'Twitter Music' },
  { type: 'link', href: '/ios5-features.html', external: true, src: '/images/Twitter-IOS5-integration.png', alt: 'iOS Integration' },
  { type: 'div', src: '/images/twitter_for_iphone.png', alt: 'Twitter for iPhone', size: 'medium' },
  { type: 'div', src: '/images/wap_browser.jpg', alt: 'WAP Browser', size: 'large' },
  { type: 'div', src: '/images/smtp_pop3_server.gif', alt: 'SMTP POP3 Server' },
  { type: 'link', href: 'https://sgi-demos.github.io', external: true, src: '/images/SGI.jpg', alt: 'SGI', size: 'large' },
];
