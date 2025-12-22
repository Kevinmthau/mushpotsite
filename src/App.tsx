import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Gallery1040 from './Gallery1040'

function HomePage() {
  const items = [
    { type: 'link', href: 'http://board.fun', external: true, src: '/images/Board.jpg', webp: '/images/Board.webp', alt: 'Board', size: 'large' },
    { type: 'div', src: '/images/esc_app_icon.png', alt: 'ESC App', size: 'small' },
    { type: 'link', href: 'https://testflight.apple.com/join/VppMNjcA', external: true, src: '/images/Whodiss.jpg', webp: '/images/Whodiss.webp', alt: 'Whodiss', size: 'small' },
    { type: 'route', to: '/1040', src: '/images/1040.jpg', webp: '/images/1040.webp', alt: '1040', size: 'large' },
    { type: 'div', src: '/images/32689-1280 2.jpg', alt: 'Twitter Music' },
    { type: 'link', href: '/ios5-features.html', external: true, src: '/images/ios_integration.png', alt: 'iOS Integration' },
    { type: 'div', src: '/images/twitter_for_iphone.png', alt: 'Twitter for iPhone', size: 'medium' },
    { type: 'div', src: '/images/wap_browser.jpg', alt: 'WAP Browser', size: 'large' },
    { type: 'div', src: '/images/smtp_pop3_server.gif', alt: 'SMTP POP3 Server' },
    { type: 'link', href: 'https://sgi-demos.github.io', external: true, src: '/images/SGI.jpg', alt: 'SGI', size: 'large' },
  ]

  const renderItem = (item: typeof items[0], index: number) => {
    const sizeClass = item.size === 'small' ? 'img-small' : item.size === 'medium' ? 'img-medium' : item.size === 'large' ? 'img-large' : item.size === 'xlarge' ? 'img-xlarge' : undefined
    const imgElement = (
      <img
        src={item.src}
        alt={item.alt}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        className={sizeClass}
      />
    )

    if (item.type === 'route') {
      return (
        <li key={index}>
          <Link to={item.to!} className="card-link">
            <div className="card-container">
              {imgElement}
            </div>
          </Link>
        </li>
      )
    } else if (item.type === 'link') {
      return (
        <li key={index}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="card-link">
            <div className="card-container">
              {imgElement}
            </div>
          </a>
        </li>
      )
    } else {
      return (
        <li key={index}>
          <div className="card-container">
            {imgElement}
          </div>
        </li>
      )
    }
  }

  return (
    <div className="coverflow-wrapper">
      <ul className="cards">
        {items.map((item, index) => renderItem(item, index))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/1040" element={<Gallery1040 />} />
      </Routes>
    </Router>
  )
}

export default App
