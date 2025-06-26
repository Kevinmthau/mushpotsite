import './App.css'

function App() {
  return (
    <div className="app">
      <div className="image-gallery">
        <a href="https://testflight.apple.com/join/NHg9cY9W" target="_blank" rel="noopener noreferrer">
          <picture>
            <source srcSet="/images/Whodiss.webp" type="image/webp" />
            <img 
              src="/images/Whodiss.png" 
              alt="Whodiss" 
              className="img-1"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </a>
        <picture>
          <source srcSet="/images/1040.webp" type="image/webp" />
          <img 
            src="/images/1040.jpg" 
            alt="1040" 
            className="img-2"
            loading="lazy"
            decoding="async"
          />
        </picture>
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
        <picture>
          <source srcSet="/images/ios_integration.webp" type="image/webp" />
          <img 
            src="/images/ios_integration.jpg" 
            alt="iOS Integration" 
            className="img-4"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <picture>
          <source srcSet="/images/twitter_for_iphone.webp" type="image/webp" />
          <img 
            src="/images/twitter_for_iphone.png" 
            alt="Twitter for iPhone" 
            className="img-5"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <picture>
          <source srcSet="/images/wap_browser.webp" type="image/webp" />
          <img 
            src="/images/wap_browser.jpg" 
            alt="WAP Browser" 
            className="img-6"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <img 
          src="/images/smtp_pop3_server.gif" 
          alt="SMTP POP3 Server" 
          className="img-7"
          loading="lazy"
          decoding="async"
        />
        <picture>
          <source srcSet="/images/SGI.webp" type="image/webp" />
          <img 
            src="/images/SGI.jpg" 
            alt="SGI" 
            className="img-8"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  )
}

export default App
