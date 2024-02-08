import './index.css'
import React from 'react'
import { App } from './app.tsx'
import { Toaster } from 'sonner'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />

    <Toaster richColors/>
  </React.StrictMode>,
)
