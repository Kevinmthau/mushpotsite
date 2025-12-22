function SkeletonItem() {
  return (
    <div className="gallery-item">
      <div className="image-container skeleton">
        <div className="skeleton-image"></div>
      </div>
      <div className="caption">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-date"></div>
      </div>
    </div>
  );
}

export default SkeletonItem;
