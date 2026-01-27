import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import PixDonation from './components/PixDonation';
import Home from './views/Home';
import { analyticsAPI } from './services/api';
import './styles/globals.scss';

const App: React.FC = () => {
  useEffect(() => {
    // Track page visit
    trackPageVisit();
  }, []);

  const trackPageVisit = async () => {
    try {
      await analyticsAPI.trackVisit(window.location.pathname);
    } catch (error) {
      console.error('Failed to track visit:', error);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Adicione outras rotas aqui */}
            </Routes>
          </main>

          <PixDonation />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
