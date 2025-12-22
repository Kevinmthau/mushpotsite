import { forwardRef } from 'react';

interface LoadMoreButtonProps {
  isLoading: boolean;
  remainingCount: number;
  onClick: () => void;
}

const LoadMoreButton = forwardRef<HTMLDivElement, LoadMoreButtonProps>(
  ({ isLoading, remainingCount, onClick }, ref) => {
    return (
      <div className="load-more-container" ref={ref}>
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <button className="load-more-btn" onClick={onClick}>
            Load More Images ({remainingCount} remaining)
          </button>
        )}
      </div>
    );
  }
);

LoadMoreButton.displayName = 'LoadMoreButton';

export default LoadMoreButton;
