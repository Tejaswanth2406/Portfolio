import React from 'react'
import ReactDOM from 'react-dom/client'
import SupportWidget from './components/SupportWidget'
import './index.css'

const widgetContainer = document.getElementById('support-widget-container')
if (widgetContainer) {
  ReactDOM.createRoot(widgetContainer).render(
    <React.StrictMode>
      <SupportWidget />
    </React.StrictMode>
  )
}
