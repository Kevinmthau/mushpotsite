import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { homePageItems } from '../../data/homePageItems';
import type { HomePageItem } from '../../data/types';
import AutoTrimImage from './AutoTrimImage';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playingVideoIndex !== null) {
        setPlayingVideoIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playingVideoIndex]);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    let frameId: number | null = null;

    const updateActiveCard = () => {
      const containerCenter = el.scrollLeft + el.clientWidth / 2;
      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveIndex((currentIndex) => (
        currentIndex === nextActiveIndex ? currentIndex : nextActiveIndex
      ));
    };

    const scheduleActiveCardUpdate = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateActiveCard();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleActiveCardUpdate);
    resizeObserver.observe(el);

    itemRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    el.addEventListener('scroll', scheduleActiveCardUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveCardUpdate);
    scheduleActiveCardUpdate();

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      el.removeEventListener('scroll', scheduleActiveCardUpdate);
      window.removeEventListener('resize', scheduleActiveCardUpdate);
    };
  }, []);

  // Elastic overscroll bounce at scroll edges
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    let overscroll = 0;
    let wheelEndTimer: ReturnType<typeof setTimeout> | null = null;
    let springBackTimer: ReturnType<typeof setTimeout> | null = null;
    let springBackEndHandler: (() => void) | null = null;
    const DAMPING = 0.4;
    const MAX_OVERSCROLL = 100;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    const setTransform = (px: number) => {
      el.style.transform = px ? `translateX(${px}px)` : '';
    };

    const clearWheelEndTimer = () => {
      if (wheelEndTimer !== null) {
        clearTimeout(wheelEndTimer);
        wheelEndTimer = null;
      }
    };

    const finishSpringBack = () => {
      if (springBackTimer !== null) {
        clearTimeout(springBackTimer);
        springBackTimer = null;
      }

      if (springBackEndHandler) {
        el.removeEventListener('transitionend', springBackEndHandler);
        springBackEndHandler = null;
      }

      el.classList.remove('elastic-springback');
    };

    const springBack = () => {
      finishSpringBack();
      overscroll = 0;
      setTransform(0);

      if (prefersReducedMotion) return;

      el.classList.add('elastic-springback');

      springBackEndHandler = () => {
        finishSpringBack();
      };
      el.addEventListener('transitionend', springBackEndHandler);
      springBackTimer = setTimeout(() => {
        finishSpringBack();
      }, 500);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;

      if (prefersReducedMotion) {
        clearWheelEndTimer();
        springBack();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      finishSpringBack();

      if (prefersReducedMotion) {
        overscroll = 0;
        setTransform(0);
        return;
      }

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;

      if (overscroll !== 0) {
        // Currently in overscroll — manage the transform directly
        e.preventDefault();
        el.classList.remove('elastic-springback');

        const prev = overscroll;
        overscroll -= delta * DAMPING;

        // If crossed zero, user scrolled back past the edge — reset
        if ((prev > 0 && overscroll <= 0) || (prev < 0 && overscroll >= 0)) {
          overscroll = 0;
          setTransform(0);
          return;
        }

        overscroll = Math.max(-MAX_OVERSCROLL, Math.min(MAX_OVERSCROLL, overscroll));
        setTransform(overscroll);
      } else if ((atStart && delta < 0) || (atEnd && delta > 0)) {
        // Entering overscroll at a boundary
        e.preventDefault();
        overscroll -= delta * DAMPING;
        overscroll = Math.max(-MAX_OVERSCROLL, Math.min(MAX_OVERSCROLL, overscroll));
        setTransform(overscroll);
      }

      clearWheelEndTimer();
      wheelEndTimer = setTimeout(() => {
        if (overscroll !== 0) springBack();
      }, 150);
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      el.removeEventListener('wheel', handleWheel);
      clearWheelEndTimer();
      finishSpringBack();
      setTransform(0);
    };
  }, []);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const firstCard = itemRefs.current[0];
    if (!firstCard) return;

    const centerFirstCard = () => {
      const targetLeft = firstCard.offsetLeft - (el.clientWidth - firstCard.clientWidth) / 2;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      el.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxScrollLeft)),
        behavior: 'auto',
      });
    };

    const frameId = requestAnimationFrame(centerFirstCard);
    const firstImage = firstCard.querySelector('img');

    if (firstImage && !firstImage.complete) {
      firstImage.addEventListener('load', centerFirstCard, { once: true });
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (firstImage && !firstImage.complete) {
        firstImage.removeEventListener('load', centerFirstCard);
      }
    };
  }, []);

  function renderItem(item: HomePageItem, index: number) {
    const itemClassName = [
      index === activeIndex ? 'is-active' : null,
      item.groupBreakAfter ? 'has-group-break-after' : null,
    ].filter(Boolean).join(' ') || undefined;
    const mediaClassName = [
      item.size ? SIZE_CLASS_MAP[item.size] : null,
      item.noReflect ? null : 'with-reflect',
    ].filter(Boolean).join(' ') || undefined;

    const imgElement = (
      <AutoTrimImage
        src={item.src}
        alt={item.alt}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        className={mediaClassName}
      />
    );

    if (item.type === 'route') {
      return (
        <li
          key={item.alt}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className={itemClassName}
        >
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
        <li
          key={item.alt}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className={itemClassName}
        >
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
        <li
          key={item.alt}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className={itemClassName}
        >
          <div className="card-container video-card">
            {isPlaying ? (
              <div className="video-wrapper">
                <video
                  src={item.videoSrc}
                  autoPlay
                  controls
                  className={mediaClassName}
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
        <li
          key={item.alt}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className={itemClassName}
        >
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
      >
        {homePageItems.map((item, index) => renderItem(item, index))}
      </ul>
    </div>
  );
}

export default HomePage;
