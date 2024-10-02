import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render( // Create a root and render the App component
  <StrictMode>
    <App /> 
  </StrictMode>,
)
