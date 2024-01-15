import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';
import './index.css';

const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYSIS_TRACKING_ID;

if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
