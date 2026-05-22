import React, { useState, useEffect } from 'react';
import RecruiterMode from './components/RecruiterMode';
import LeisureMode from './components/LeisureMode';
import './style.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [systemTime, setSystemTime] = useState('00:00:00.00');
  const [viewport, setViewport] = useState('0000x0000');
  
  // Custom CSS Cursor Coordinate Tracking State
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [activePane, setActivePane] = useState('none');

  useEffect(() => {
    if (currentPage !== 'landing') return;

    // 1. Clock Loop
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setSystemTime(`${hrs}:${mins}:${secs}.${ms}`);
    };
    const timerId = setInterval(updateClock, 30);

    // 2. Viewport Handler
    const updateViewport = () => {
      setViewport(`${window.innerWidth}x${window.innerHeight}`);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);

    // 3. Mouse Movement Tracking Loop
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timerId);
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentPage]);

  const handleLandingClick = (mode) => {
    setCurrentPage(mode);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return (
      <div className="landing-page horizontal-hud-layout">
        
        {/* GLOBAL TOP HUD RESTING BAR */}
        <header className="global-hud-bar">
          <div className="hud-left">
            <span className="hud-name">AKELLA KRISHNA VAMSHI</span>
            <span className="hud-status-dot"></span>
            <span className="hud-id">BUILD_v2.0.26</span>
          </div>
          
          <div className="hud-center">
            <span className="hud-mode-indicator">AKV_PORTFOLIO // ACTIVE</span>
          </div>
          
          <div className="hud-right">
            <span className="hud-coordinate">VIEWPORT: {viewport} <span className="orange-accent">◼</span></span>
            <span className="hud-ticker">{systemTime}</span>
          </div>
        </header>

        {/* MAIN PANE SPLIT CONTAINER */}
        <div 
          className="split-view-container"
          onMouseLeave={() => setActivePane('none')}
        >
          {/* LEFT PANEL: SYSTEM BLUEPRINT */}
          <div 
            className="blueprint-pane"
            onMouseEnter={() => setActivePane('blueprint')}
            onClick={() => handleLandingClick('recruiter')}
          >
            <div className="corner-tick top-left"></div>
            <div className="corner-tick bottom-left orange-tick"></div>
            
            <div className="blueprint-content">
              <span className="tech-meta-tag orange-accent">// ACTIVE_CAREER_DATA_LOADED</span>
              <h2 className="blueprint-title">
                SYSTEM<br />
                <span>BLUEPRINT</span>
              </h2>
              <p className="blueprint-description">
                Review my professional background, technical engineering skills, and core educational milestones efficiently.
              </p>
              
              <div className="blueprint-action-trigger">
                <span className="trigger-text">INITIALIZE_SYSTEM_LOAD</span>
                <div className="action-arrow">↘</div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: ANCIENT ARTIFACT */}
          <div 
            className="artifact-pane"
            onMouseEnter={() => setActivePane('artifact')}
            onClick={() => handleLandingClick('leisure')}
          >
            <div className="artifact-content">
              <div className="pixel-scroll-large">
                <div className="scroll-banner">RPG_CORE</div>
                <div className="scroll-body">
                  <h2 className="scroll-main-title">LEISURE MODE</h2>
                  <p className="scroll-heading">QUEST ACTIVE: EXPLORE CREATIVE SIDE</p>
                  
                  <p className="scroll-description">
                    Step into my world. Learn about me personally—my design philosophies, interactive experiments, and creative side quests.
                  </p>
                  
                  <p className="scroll-text">
                    Unroll the parchment to discover fragments of interactive design, personal software experiments, and 3D web graphics.
                  </p>
                  <div className="scroll-footer">✦ CLICK TO UNLOCK QUEST LOG ✦</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PURE CSS INTERACTIVE LENS CURSOR */}
        <div 
          className={`css-lens-cursor ${activePane}`}
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <div className="lens-center-dot"></div>
          <div className="lens-compass-handle"></div>
        </div>

      </div>
    );
  }

  return (
    <div className="app">
      {currentPage === 'recruiter' ? (
        <RecruiterMode onBackToHome={handleBackToHome} />
      ) : (
        <LeisureMode onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;