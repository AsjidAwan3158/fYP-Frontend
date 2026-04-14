import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bidding_page stylesheets (Tailwind + custom)
import "./stylesheets/inline-style-0.css"
import "./stylesheets/inline-style-1.css"
import "./stylesheets/inline-style-2.css"
import "./stylesheets/stylesheet_7.css"
import "./stylesheets/stylesheet_6.css"
import "./stylesheets/stylesheet_5.css"
import "./stylesheets/stylesheet_4.css"
import "./stylesheets/inline-style-7.css"
import "./stylesheets/stylesheet_3.css"
import "./stylesheets/inline-style-9.css"
import "./stylesheets/inline-style-10.css"
import App from './App.tsx'

const root = document.querySelector('#root') ?? document.querySelector('html')!
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
