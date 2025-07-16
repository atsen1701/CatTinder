import '../css/header.css'

function headerTinder() {
    return (
      <header className="header-tinder">
        <div className="header-logo">
          <span role="img" aria-label="cat-paw">🐾</span>
          <span className="header-title">CatTinder</span>
          <span className="header-tagline">– Where paws swipe right 🐱💖</span>
        </div>
        {/* Optional navigation placeholder */}
        {/* <nav className="header-nav">
          <a href="/">Home</a>
        </nav> */}
      </header>
    );
  }
  

export default headerTinder