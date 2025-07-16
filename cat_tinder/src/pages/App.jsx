//use the useNavigate for dom(navigation other pages)
import { useNavigate } from 'react-router-dom';
//css import for the MainLoadPage
import '../css/App.css'

//Start of the (MainLoadPage)for cattinder
function MainLoadPage() {
  //Declare the navigate library to allow the use of import
  const navigate = useNavigate();
  return (
    <div className="mainload-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="mainload-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mainload-paws">
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="18" rx="8" ry="10" fill="#4f46e5" fillOpacity="0.18"/>
            <ellipse cx="48" cy="18" rx="8" ry="10" fill="#4f46e5" fillOpacity="0.18"/>
            <ellipse cx="30" cy="8" rx="5" ry="6" fill="#4f46e5" fillOpacity="0.28"/>
            <ellipse cx="20" cy="30" rx="3" ry="4" fill="#4f46e5" fillOpacity="0.28"/>
            <ellipse cx="40" cy="30" rx="3" ry="4" fill="#4f46e5" fillOpacity="0.28"/>
          </svg>
        </div>
        <header className="mainload-header">
          <h1>CatTinder</h1>
          <p className="mainload-tagline">Find your purrfect match!</p>
        </header>
        <div className="mainload-image-placeholder">
          <span role="img" aria-label="cat" style={{fontSize: '5rem'}}>🐾</span>
        </div>
        <button className="mainload-cta" onClick={() => navigate('/CatTinder')}>Get Started</button>
      </div>
    </div>
  );
}
//End of the MainLoadPage()

//SET THE DEFAULT OF EXPORTING THE MAIN CATTINDER
export default MainLoadPage

