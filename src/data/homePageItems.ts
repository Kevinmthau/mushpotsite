import type { HomePageItem } from './types';

export const homePageItems: HomePageItem[] = [
  { type: 'link', href: 'http://board.fun', external: true, src: '/images/Board.jpg', webp: '/images/Board.webp', alt: 'Board', size: 'medium', noReflect: true },
  { type: 'link', href: '/outfits', src: '/images/Outfit-finder.jpg', alt: 'Outfit Finder', extraSpacing: true, noReflect: true },
  { type: 'link', href: 'https://testflight.apple.com/join/VppMNjcA', external: true, src: '/images/Whodiss.jpg', webp: '/images/Whodiss.webp', alt: 'Whodiss', noReflect: true, extraSpacing: true },
  { type: 'route', to: '/1040', src: '/images/1040.jpg', webp: '/images/1040.webp', alt: '1040', size: 'large', extraSpacing: true, noReflect: true },
  { type: 'div', src: '/images/twitter-music.jpg', alt: 'Twitter Music', noReflect: true },
  { type: 'link', href: '/ios5-features.html', external: true, src: '/images/Twitter-IOS5-integration.png', alt: 'Twitter iOS 5', noReflect: true },
  { type: 'div', src: '/images/Twitter-for-ipad.jpg', alt: 'Twitter for iPad', noReflect: true },
  { type: 'div', src: '/images/twitter_for_iphone.png', alt: 'Twitter for iPhone', extraSpacing: true, noReflect: true },
  { type: 'div', src: '/images/wap_browser.jpg', alt: 'Openwave', size: 'large', extraSpacing: true, noReflect: true },
  { type: 'div', src: '/images/smtp_pop3_server.gif', alt: 'Post.Office', extraSpacing: true, noReflect: true },
  { type: 'link', href: 'https://sgi-demos.github.io', external: true, src: '/images/SGI.jpg', alt: 'SGI', size: 'large', noReflect: true },
];
