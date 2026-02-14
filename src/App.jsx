import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import RecruiterMode from './components/RecruiterMode';
import LeisureMode from './components/LeisureMode';
import './style.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'recruiter', or 'leisure'

  const handleLandingClick = (mode) => {
    setCurrentPage(mode);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return (
      <div className="app landing-page">
        <div className="landing-container">
          <h1>Welcome</h1>
          <p>Choose your mode:</p>
          <div className="landing-buttons">
            <button 
              className="landing-btn recruiter-btn"
              onClick={() => handleLandingClick('recruiter')}
            >
              Time Crunch
            </button>
            <button 
              className="landing-btn leisure-btn"
              onClick={() => handleLandingClick('leisure')}
            >
              Leisure
            </button>
          </div>
        </div>
        <Analytics />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Render appropriate mode */}
      {currentPage === 'recruiter' ? (
        <RecruiterMode onBackToHome={handleBackToHome} />
      ) : (
        <LeisureMode onBackToHome={handleBackToHome} />
      )}
      <Analytics />
    </div>
  );
}

export default App;