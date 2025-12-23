import { Link } from 'react-router-dom';
import { homePageItems } from '../../data/homePageItems';
import type { HomePageItem } from '../../data/types';
import './HomePage.css';

function HomePage() {
  const renderItem = (item: HomePageItem, index: number) => {
    const classes = [
      item.size === 'small' ? 'img-small'
        : item.size === 'medium' ? 'img-medium'
        : item.size === 'large' ? 'img-large'
        : item.size === 'xlarge' ? 'img-xlarge'
        : null,
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

    const liClass = item.extraSpacing ? 'extra-spacing' : undefined;

    if (item.type === 'route') {
      return (
        <li key={index} className={liClass}>
          <Link to={item.to!} className="card-link">
            <div className="card-container">
              {imgElement}
            </div>
          </Link>
        </li>
      );
    } else if (item.type === 'link') {
      return (
        <li key={index} className={liClass}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="card-link">
            <div className="card-container">
              {imgElement}
            </div>
          </a>
        </li>
      );
    } else {
      return (
        <li key={index} className={liClass}>
          <div className="card-container">
            {imgElement}
          </div>
        </li>
      );
    }
  };

  return (
    <div className="coverflow-wrapper">
      <ul className="cards">
        {homePageItems.map((item, index) => renderItem(item, index))}
      </ul>
    </div>
  );
}

export default HomePage;
