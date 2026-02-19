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

const EDGE_EPSILON = 2;
const MAX_EDGE_OFFSET = 40;
const MIN_BOUNCE_OFFSET = 0.5;
const TOUCH_EDGE_RESISTANCE = 0.45;
const WHEEL_EDGE_RESISTANCE = 0.2;
const EDGE_FOLLOW_FACTOR = 0.45;
const EDGE_SNAP_EPSILON = 0.15;
const WHEEL_RELEASE_DELAY_MS = 70;
const TOUCH_EDGE_BOUNCE_MIN = 8;
const TOUCH_EDGE_BOUNCE_MAX = 20;
const TOUCH_EDGE_BOUNCE_SCALE = 0.9;

type EdgeDirection = 'start' | 'end';

function readTranslateX(el: HTMLElement): number {
  const transform = window.getComputedStyle(el).transform;
  if (!transform || transform === 'none') return 0;

  const matrix2d = /^matrix\((.+)\)$/.exec(transform);
  if (matrix2d) {
    const values = matrix2d[1].split(',').map((value) => Number(value.trim()));
    return Number.isFinite(values[4]) ? values[4] : 0;
  }

  const matrix3d = /^matrix3d\((.+)\)$/.exec(transform);
  if (matrix3d) {
    const values = matrix3d[1].split(',').map((value) => Number(value.trim()));
    return Number.isFinite(values[12]) ? values[12] : 0;
  }

  return 0;
}

function HomePage() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const cardsRef = useRef<HTMLUListElement | null>(null);
  const bounceAnimation = useRef<Animation | null>(null);
  const touchLastX = useRef<number | null>(null);
  const isTouching = useRef(false);
  const lastTouchDeltaX = useRef(0);
  const pendingTouchMomentumEdge = useRef<EdgeDirection | null>(null);
  const edgeTargetOffset = useRef(0);
  const edgeRenderedOffset = useRef(0);
  const edgeFrame = useRef<number | null>(null);
  const wheelReleaseTimer = useRef<number | null>(null);

  const setEdgeTransform = useCallback((offset: number) => {
    const el = cardsRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.transform = `translateX(${offset}px)`;
  }, []);

  const clearWheelReleaseTimer = useCallback(() => {
    if (wheelReleaseTimer.current !== null) {
      window.clearTimeout(wheelReleaseTimer.current);
      wheelReleaseTimer.current = null;
    }
  }, []);

  const clearEdgeFrame = useCallback(() => {
    if (edgeFrame.current !== null) {
      cancelAnimationFrame(edgeFrame.current);
      edgeFrame.current = null;
    }
  }, []);

  const syncOffsetFromDom = useCallback(() => {
    const el = cardsRef.current;
    if (!el) return 0;

    const offset = readTranslateX(el);
    edgeRenderedOffset.current = offset;
    edgeTargetOffset.current = offset;
    return offset;
  }, []);

  const queueOffsetRender = useCallback(() => {
    if (edgeFrame.current !== null) return;

    const tick = () => {
      const diff = edgeTargetOffset.current - edgeRenderedOffset.current;
      if (Math.abs(diff) <= EDGE_SNAP_EPSILON) {
        edgeRenderedOffset.current = edgeTargetOffset.current;
        setEdgeTransform(edgeRenderedOffset.current);
        edgeFrame.current = null;
        return;
      }

      edgeRenderedOffset.current += diff * EDGE_FOLLOW_FACTOR;
      setEdgeTransform(edgeRenderedOffset.current);
      edgeFrame.current = requestAnimationFrame(tick);
    };

    edgeFrame.current = requestAnimationFrame(tick);
  }, [setEdgeTransform]);

  const animateElasticReturn = useCallback((fromOffset?: number) => {
    const el = cardsRef.current;
    if (!el) return;

    clearWheelReleaseTimer();
    clearEdgeFrame();

    if (bounceAnimation.current) {
      bounceAnimation.current.cancel();
      bounceAnimation.current = null;
    }

    const startOffset = Math.max(
      -MAX_EDGE_OFFSET,
      Math.min(MAX_EDGE_OFFSET, fromOffset ?? syncOffsetFromDom())
    );

    edgeRenderedOffset.current = startOffset;
    edgeTargetOffset.current = 0;
    setEdgeTransform(startOffset);

    if (Math.abs(startOffset) < MIN_BOUNCE_OFFSET) {
      edgeRenderedOffset.current = 0;
      setEdgeTransform(0);
      return;
    }

    if (el.animate) {
      bounceAnimation.current = el.animate([
        { transform: `translateX(${startOffset}px)` },
        { transform: `translateX(${startOffset * -0.2}px)` },
        { transform: 'translateX(0px)' },
      ], {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1.0, 0.36, 1.0)',
      });

      bounceAnimation.current.onfinish = () => {
        bounceAnimation.current = null;
        edgeRenderedOffset.current = 0;
        edgeTargetOffset.current = 0;
        setEdgeTransform(0);
      };

      bounceAnimation.current.oncancel = () => {
        bounceAnimation.current = null;
      };
      return;
    }

    el.style.transition = 'transform 220ms cubic-bezier(0.22, 1.0, 0.36, 1.0)';
    el.style.transform = 'translateX(0px)';
    edgeRenderedOffset.current = 0;
    edgeTargetOffset.current = 0;
  }, [clearEdgeFrame, clearWheelReleaseTimer, setEdgeTransform, syncOffsetFromDom]);

  const scheduleElasticReturn = useCallback(() => {
    clearWheelReleaseTimer();
    wheelReleaseTimer.current = window.setTimeout(() => {
      animateElasticReturn();
    }, WHEEL_RELEASE_DELAY_MS);
  }, [animateElasticReturn, clearWheelReleaseTimer]);

  const applyEdgeResistance = useCallback((intentDelta: number, resistance: number) => {
    const el = cardsRef.current;
    if (!el || intentDelta === 0) return false;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return false;

    const atStart = el.scrollLeft <= EDGE_EPSILON;
    const atEnd = el.scrollLeft >= maxScroll - EDGE_EPSILON;
    const overflowingStart = atStart && intentDelta < 0;
    const overflowingEnd = atEnd && intentDelta > 0;

    if (!overflowingStart && !overflowingEnd) {
      return false;
    }

    if (bounceAnimation.current) {
      bounceAnimation.current.cancel();
      bounceAnimation.current = null;
      syncOffsetFromDom();
    }

    const boundary = overflowingStart ? 0 : maxScroll;
    if (Math.abs(el.scrollLeft - boundary) > 0.1) {
      el.scrollLeft = boundary;
    }

    const nextOffset = edgeTargetOffset.current + (-intentDelta * resistance);
    edgeTargetOffset.current = Math.max(-MAX_EDGE_OFFSET, Math.min(MAX_EDGE_OFFSET, nextOffset));
    queueOffsetRender();
    return true;
  }, [queueOffsetRender, syncOffsetFromDom]);

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
    return () => {
      clearWheelReleaseTimer();
      clearEdgeFrame();
      if (bounceAnimation.current) {
        bounceAnimation.current.cancel();
        bounceAnimation.current = null;
      }
      if (cardsRef.current) {
        cardsRef.current.style.transition = 'none';
        cardsRef.current.style.transform = 'translateX(0px)';
      }
      pendingTouchMomentumEdge.current = null;
      lastTouchDeltaX.current = 0;
      edgeRenderedOffset.current = 0;
      edgeTargetOffset.current = 0;
    };
  }, [clearEdgeFrame, clearWheelReleaseTimer]);

  const handleWheel = useCallback((e: WheelEvent<HTMLUListElement>) => {
    pendingTouchMomentumEdge.current = null;
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (applyEdgeResistance(delta, WHEEL_EDGE_RESISTANCE)) {
      e.preventDefault();
      scheduleElasticReturn();
    }
  }, [applyEdgeResistance, scheduleElasticReturn]);

  const handleTouchStart = useCallback((e: TouchEvent<HTMLUListElement>) => {
    if (e.touches.length !== 1) return;

    clearWheelReleaseTimer();

    if (bounceAnimation.current) {
      bounceAnimation.current.cancel();
      bounceAnimation.current = null;
      syncOffsetFromDom();
    }

    const x = e.touches[0].clientX;
    touchLastX.current = x;
    isTouching.current = true;
    lastTouchDeltaX.current = 0;
    pendingTouchMomentumEdge.current = null;
  }, [clearWheelReleaseTimer, syncOffsetFromDom]);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLUListElement>) => {
    if (!isTouching.current || e.touches.length !== 1) return;

    const x = e.touches[0].clientX;
    const lastX = touchLastX.current ?? x;
    const deltaX = x - lastX;
    touchLastX.current = x;
    lastTouchDeltaX.current = deltaX;

    if (applyEdgeResistance(-deltaX, TOUCH_EDGE_RESISTANCE)) {
      e.preventDefault();
    }
  }, [applyEdgeResistance]);

  const handleScroll = useCallback(() => {
    const el = cardsRef.current;
    if (!el || isTouching.current || bounceAnimation.current) return;

    const pendingEdge = pendingTouchMomentumEdge.current;
    if (!pendingEdge) return;

    if (
      Math.abs(edgeTargetOffset.current) >= MIN_BOUNCE_OFFSET
      || Math.abs(edgeRenderedOffset.current) >= MIN_BOUNCE_OFFSET
    ) {
      return;
    }

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      pendingTouchMomentumEdge.current = null;
      return;
    }

    const atStart = el.scrollLeft <= EDGE_EPSILON;
    const atEnd = el.scrollLeft >= maxScroll - EDGE_EPSILON;

    if (pendingEdge === 'start' && atStart) {
      pendingTouchMomentumEdge.current = null;
      animateElasticReturn(TOUCH_EDGE_BOUNCE_MIN);
      return;
    }

    if (pendingEdge === 'end' && atEnd) {
      pendingTouchMomentumEdge.current = null;
      animateElasticReturn(-TOUCH_EDGE_BOUNCE_MIN);
      return;
    }

    if ((pendingEdge === 'start' && atEnd) || (pendingEdge === 'end' && atStart)) {
      pendingTouchMomentumEdge.current = null;
    }
  }, [animateElasticReturn]);

  const handleTouchEnd = useCallback(() => {
    isTouching.current = false;
    touchLastX.current = null;
    clearWheelReleaseTimer();

    const el = cardsRef.current;
    const direction: EdgeDirection | null = lastTouchDeltaX.current < -0.1
      ? 'end'
      : lastTouchDeltaX.current > 0.1
        ? 'start'
        : null;

    if (!el) {
      pendingTouchMomentumEdge.current = null;
      lastTouchDeltaX.current = 0;
      animateElasticReturn();
      return;
    }

    const maxScroll = el.scrollWidth - el.clientWidth;
    const atStart = maxScroll > 0 && el.scrollLeft <= EDGE_EPSILON;
    const atEnd = maxScroll > 0 && el.scrollLeft >= maxScroll - EDGE_EPSILON;
    const hasActiveEdgeOffset = (
      Math.abs(edgeTargetOffset.current) >= MIN_BOUNCE_OFFSET
      || Math.abs(edgeRenderedOffset.current) >= MIN_BOUNCE_OFFSET
    );

    if (hasActiveEdgeOffset) {
      pendingTouchMomentumEdge.current = null;
      animateElasticReturn();
    } else if (direction === 'start' && atStart) {
      const strength = Math.max(
        TOUCH_EDGE_BOUNCE_MIN,
        Math.min(TOUCH_EDGE_BOUNCE_MAX, Math.abs(lastTouchDeltaX.current) * TOUCH_EDGE_BOUNCE_SCALE)
      );
      pendingTouchMomentumEdge.current = null;
      animateElasticReturn(strength);
    } else if (direction === 'end' && atEnd) {
      const strength = Math.max(
        TOUCH_EDGE_BOUNCE_MIN,
        Math.min(TOUCH_EDGE_BOUNCE_MAX, Math.abs(lastTouchDeltaX.current) * TOUCH_EDGE_BOUNCE_SCALE)
      );
      pendingTouchMomentumEdge.current = null;
      animateElasticReturn(-strength);
    } else {
      pendingTouchMomentumEdge.current = direction;
      animateElasticReturn();
    }

    lastTouchDeltaX.current = 0;
  }, [animateElasticReturn, clearWheelReleaseTimer]);

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
        onScroll={handleScroll}
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
