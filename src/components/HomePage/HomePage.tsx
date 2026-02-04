import { useState, useEffect, useRef, useCallback, type WheelEvent, type TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { homePageItems } from '../../data/homePageItems';
import type { HomePageItem } from '../../data/types';
import './HomePage.css';

const SIZE_CLASS_MAP: Record<string, string> = {
  xsmall: 'img-xsmall',
  small: 'img-small',
  medium: 'img-medium',
  large: 'img-large',
  xlarge: 'img-xlarge',
};

function HomePage() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const cardsRef = useRef<HTMLUListElement | null>(null);
  const bounceAnimation = useRef<Animation | null>(null);
  const touchLastX = useRef<number | null>(null);
  const isTouching = useRef(false);
  const edgeOffset = useRef(0);

  const animateElasticReturn = useCallback((fromOffset: number) => {
    const el = cardsRef.current;
    if (!el) return;

    if (bounceAnimation.current) {
      bounceAnimation.current.cancel();
      bounceAnimation.current = null;
    }

    if (el.animate) {
      bounceAnimation.current = el.animate([
        { transform: `translateX(${fromOffset}px)` },
        { transform: `translateX(${fromOffset * -0.2}px)` },
        { transform: 'translateX(0px)' },
      ], {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1.0, 0.36, 1.0)',
      });

      bounceAnimation.current.onfinish = () => {
        bounceAnimation.current = null;
        el.style.transform = 'translateX(0px)';
      };
      return;
    }

    el.style.transition = 'transform 220ms cubic-bezier(0.22, 1.0, 0.36, 1.0)';
    el.style.transform = 'translateX(0px)';
  }, []);

  const triggerBounce = useCallback((offset: number) => {
    const el = cardsRef.current;
    if (!el) return;

    el.style.transform = `translateX(${offset}px)`;
    animateElasticReturn(offset);
  }, [animateElasticReturn]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playingVideoIndex !== null) {
        setPlayingVideoIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (bounceAnimation.current) {
        bounceAnimation.current.cancel();
        bounceAnimation.current = null;
      }
      if (cardsRef.current) {
        cardsRef.current.style.transform = 'translateX(0px)';
      }
    };
  }, [playingVideoIndex]);

  const handleWheel = useCallback((e: WheelEvent<HTMLUListElement>) => {
    const el = cardsRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll;

    if ((atStart && delta < 0) || (atEnd && delta > 0)) {
      e.preventDefault();
      const strength = Math.min(30, Math.abs(delta) * 0.2);
      triggerBounce(delta < 0 ? strength : -strength);
    }
  }, [triggerBounce]);

  const handleTouchStart = useCallback((e: TouchEvent<HTMLUListElement>) => {
    if (e.touches.length !== 1) return;
    const x = e.touches[0].clientX;
    touchLastX.current = x;
    isTouching.current = true;
    edgeOffset.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLUListElement>) => {
    const el = cardsRef.current;
    if (!el || !isTouching.current || e.touches.length !== 1) return;

    const x = e.touches[0].clientX;
    const lastX = touchLastX.current ?? x;
    const deltaX = x - lastX;
    touchLastX.current = x;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll;

    if ((atStart && deltaX > 0) || (atEnd && deltaX < 0)) {
      e.preventDefault();
      const nextOffset = edgeOffset.current + deltaX * 0.6;
      edgeOffset.current = Math.max(-40, Math.min(40, nextOffset));
      if (bounceAnimation.current) {
        bounceAnimation.current.cancel();
        bounceAnimation.current = null;
      }
      el.style.transition = 'none';
      el.style.transform = `translateX(${edgeOffset.current}px)`;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const el = cardsRef.current;
    if (el && Math.abs(edgeOffset.current) > 0.5) {
      animateElasticReturn(edgeOffset.current);
    } else if (el) {
      el.style.transform = 'translateX(0px)';
    }
    isTouching.current = false;
    touchLastX.current = null;
    edgeOffset.current = 0;
  }, [animateElasticReturn]);

  function renderItem(item: HomePageItem, index: number) {
    const classes = [
      item.size ? SIZE_CLASS_MAP[item.size] : null,
      item.noReflect ? 'no-reflect' : null,
    ].filter(Boolean).join(' ') || undefined;

    const imgElement = (
      <img
        src={item.src}
        alt={item.alt}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        className={classes}
      />
    );

    if (item.type === 'route') {
      return (
        <li key={index}>
          <Link to={item.to} className="card-link">
            <div className="card-container">
              {imgElement}
            </div>
          </Link>
        </li>
      );
    } else if (item.type === 'link') {
      const isExternal = /^https?:\/\//i.test(item.href);
      return (
        <li key={index}>
          <a
            href={item.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="card-link"
          >
            <div className="card-container">
              {imgElement}
            </div>
          </a>
        </li>
      );
    } else if (item.type === 'video') {
      const isPlaying = playingVideoIndex === index;

      return (
        <li key={index}>
          <div className="card-container video-card">
            {isPlaying ? (
              <div className="video-wrapper">
                <video
                  src={item.videoSrc}
                  autoPlay
                  controls
                  className={classes}
                  onEnded={() => setPlayingVideoIndex(null)}
                />
                <button
                  className="video-close-btn"
                  onClick={() => setPlayingVideoIndex(null)}
                  aria-label="Close video"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                className="video-thumbnail-btn"
                onClick={() => setPlayingVideoIndex(index)}
              >
                {imgElement}
              </button>
            )}
          </div>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <div className="card-container">
            {imgElement}
          </div>
        </li>
      );
    }
  }

  return (
    <div className="coverflow-wrapper">
      <div className="social-icons">
        <a href="https://github.com/Kevinmthau" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://x.com/kevinthau" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
      </div>
      <ul
        className="cards"
        ref={cardsRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {homePageItems.map((item, index) => renderItem(item, index))}
      </ul>
    </div>
  );
}

export default HomePage;
