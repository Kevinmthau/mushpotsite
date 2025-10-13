import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Gallery1040 from './Gallery1040'

function HomePage() {
  return (
    <div className="app">
      <div className="image-gallery">
        <img 
          src="/images/esc_app_icon.png" 
          alt="ESC App" 
          className="img-0"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <a href="https://testflight.apple.com/join/VppMNjcA" target="_blank" rel="noopener noreferrer">
          <picture>
            <source srcSet="/images/Whodiss.webp" type="image/webp" />
            <img 
              src="/images/Whodiss.jpg" 
              alt="Whodiss" 
              className="img-1"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </a>
        <Link to="/1040">
          <picture>
            <source srcSet="/images/1040.webp" type="image/webp" />
            <img 
              src="/images/1040.jpg" 
              alt="1040" 
              className="img-2"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </Link>
        <a href="https://vimeo.com/1076948952/92443f11db?share=copy" target="_blank" rel="noopener noreferrer">
          <picture>
            <source srcSet="/images/Board.webp" type="image/webp" />
            <img 
              src="/images/Board.jpg" 
              alt="Board" 
              className="img-3"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </a>
        <a href="/ios5-features.html" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/ios_integration.jpg"
            alt="iOS Integration"
            className="img-4"
            loading="lazy"
            decoding="async"
          />
        </a>
        <img 
          src="/images/twitter_for_iphone.png" 
          alt="Twitter for iPhone" 
          className="img-5"
          loading="lazy"
          decoding="async"
        />
        <a href="https://www.wsj.com/articles/SB965779757119553850?gaa_at=eafs&gaa_n=ASWzDAi7K-S8IAOHqDqlSOXLc9Z3vQ7YY_wR7KW9biptZN3baKHlFU0zhWmuo0COMcw%3D&gaa_ts=688bdd16&gaa_sig=ctceE0aI7N0Fith4EO6WhhYJDmTG6oS1asqbE4dL6OGVYW13cB6KsSXn-C21iTnqfjB8-PSNmoIE7GRyW18Cyg%3D%3D" target="_blank" rel="noopener noreferrer">
          <img 
            src="/images/wap_browser.jpg" 
            alt="WAP Browser" 
            className="img-6"
            loading="lazy"
            decoding="async"
          />
        </a>
        <img 
          src="/images/smtp_pop3_server.gif" 
          alt="SMTP POP3 Server" 
          className="img-7"
          loading="lazy"
          decoding="async"
        />
        <a href="https://sgi-demos.github.io" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/SGI.jpg"
            alt="SGI"
            className="img-8"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
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
