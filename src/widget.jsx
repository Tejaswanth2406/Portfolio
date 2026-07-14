import React from 'react'
import ReactDOM from 'react-dom/client'
import SupportWidget from './components/SupportWidget'
import './index.css'

const widgetRoot = document.createElement('div')
widgetRoot.id = 'support-widget-root'
document.body.appendChild(widgetRoot)

ReactDOM.createRoot(widgetRoot).render(
  <React.StrictMode>
    <SupportWidget />
  </React.StrictMode>
)
