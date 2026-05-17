import React from 'react'
import ReactDOM, { type Container } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as Container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)