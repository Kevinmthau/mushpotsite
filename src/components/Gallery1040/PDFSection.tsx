import { memo } from 'react';

const PDF_PATH = '/images/1040/documents/2026_0129 1040FifthAve9-10C ProposedArt.pdf';
const COVER_PATH = '/images/1040/documents/pdf-cover.jpg';

const PDFSection = memo(function PDFSection() {
  return (
    <div className="pdf-section">
      <div className="pdf-container">
        <div className="pdf-preview">
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-cover-link"
            title="Click to view Design Presentation PDF"
          >
            <img
              src={COVER_PATH}
              alt="Design Presentation - Click to view PDF"
              className="pdf-cover-image"
            />
            <div className="pdf-overlay">
              <span className="pdf-overlay-text">View Design Presentation</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
});

export default PDFSection;
