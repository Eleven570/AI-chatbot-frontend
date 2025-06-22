import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import './custom.css'

import App from './App.jsx'
import NotionStyleEditor from './pages/NotionStyleEditor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail/:id" element={<NotionStyleEditor />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
