import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [apiMessage, setApiMessage] = useState('');
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Use backend health endpoint (proxied in development)
        const base = process.env.REACT_APP_BACKEND_URL || '';
        const url = base ? `${base}/api/health` : '/api/health';
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const msg = data?.status || data?.message || 'OK';
        setApiMessage(msg);
        setApiError('');
      } catch (err) {
        setApiError('API unavailable');
      }
    };
    fetchStatus();
  }, []);

  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
        <div style={{
          position: 'fixed',
          bottom: 12,
          right: 12,
          background: '#111',
          color: '#fff',
          border: '1px solid #333',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 12,
          opacity: 0.9,
          zIndex: 9999,
        }}>
          {apiError ? `API: ${apiError}` : `API: ${apiMessage}`}
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;