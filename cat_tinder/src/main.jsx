import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css'
//Import The MainLoadPage 
import MainLoadPage from './pages/App.jsx'
//Import The MainTinder 
import MainTinder from './pages/MainTinder.jsx'
//Import the headerTinder 
import headerTinder from './pages/header.jsx'
//Import the footerTinder
import footerTinder from './pages/footer.jsx'

const Header = headerTinder;
const Footer = footerTinder;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainLoadPage />} />
        <Route path="/CatTinder" element={<MainTinder />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
