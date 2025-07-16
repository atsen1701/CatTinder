import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css'
//Import The MainLoadPage 
import MainLoadPage from './pages/App.jsx'
//Import The MainTinder 
import MainTinder from './pages/MainTinder.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLoadPage />} />
        <Route path="/CatTinder" element={<MainTinder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
