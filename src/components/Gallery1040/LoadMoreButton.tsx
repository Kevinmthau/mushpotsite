import { forwardRef } from 'react';

interface LoadMoreButtonProps {
  remainingCount: number;
  onClick: () => void;
}

const LoadMoreButton = forwardRef<HTMLDivElement, LoadMoreButtonProps>(
  ({ remainingCount, onClick }, ref) => {
    return (
      <div className="load-more-container" ref={ref}>
        <button className="load-more-btn" onClick={onClick}>
          Load More Images ({remainingCount} remaining)
        </button>
      </div>
    );
  }
);

LoadMoreButton.displayName = 'LoadMoreButton';

export default LoadMoreButton;
