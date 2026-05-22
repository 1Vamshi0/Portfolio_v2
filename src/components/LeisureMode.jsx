/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import InfoCard from './InfoCard';
import ProgressBar from './ProgressBar';

const CONTAINER_WIDTH = 1264;
const CONTAINER_HEIGHT = 632;

const DESK_ELEMENTS = {
  lamp: {
    position: { top: '0px', left: '12px' },
    size: { width: '100px', height: 'auto' },
    title: 'Click to toggle lamp',
    hasClick: true,
  },
  books: {
    position: { bottom: '63px', left: '151px' },
    size: { width: '190px', height: '200px' },
    title: 'Book and Quill',
    hasClick: true,
    modalType: 'hobby',
  },
  phone: {
    position: { bottom: '6px', right: '480px' },
    size: { width: '180px', height: '80px' },
    title: 'Click to contact',
    hasClick: true,
    modalType: 'contact',
  },
  laptop: {
    position: { bottom: '95px', right: '202px' },
    size: { width: '390px', height: 'auto' },
    title: 'Laptop',
    hasClick: true,
    modalType: 'projects',
  },
  coffeeMug: {
    position: { bottom: '82px', right: '63px' },
    size: { width: '80px', height: 'auto' },
    title: 'Coffee mug',
    hasClick: true,
    modalType: 'coffeeMug',
  },
  globe: {
    position: { bottom: '107px', right: '632px' },
    size: { width: '130px', height: 'auto' },
    title: 'Globe',
    hasClick: true,
    modalType: 'globe',
  },
  bookStack: {
    position: { bottom: '-38px', left: '-63px' },
    size: { width: '260px', height: 'auto' },
    title: 'Book Stack',
    hasClick: false,
  },
  news: {
    position: { bottom: '-50px', left: '265px' },
    size: { width: '320px', height: 'auto' },
    title: 'News',
    hasClick: false,
  },
  hourglass: {
    position: { bottom: '126px', left: '404px' },
    size: { width: '40px', height: 'auto' },
    title: 'Hourglass',
    hasClick: true,
    modalType: 'hourglass',
  },
  potat: {
    position: { bottom: '32px', right: '164px' },
    size: { width: '150px', height: 'auto' },
    title: 'Potato',
    hasClick: true,
    modalType: 'potat',
  },
  smoke: {
    position: { bottom: '133px', right: '88px' },
    size: { width: '40px', height: 'auto' },
    title: 'Smoke',
    hasClick: true,
    modalType: 'smoke',
  },
};

const CORK_BOARD_CONFIG = {
  zone: {
    position: { top: '16px', left: '107px' },
    size: { width: '885px', height: '316px' },
  },
  glow: {
    position: { top: '32px', left: '316px' },
    size: { width: '632px', height: '284px' },
  },
};

const CORK_ELEMENTS = {
  wantedPoster: {
    position: { top: '4%', left: '41.5%' },
    size: { width: '14%', height: 'auto' },
    title: 'Click to learn about me',
    text: '🎯 Wanted Poster',
    modalType: 'about',
  },
  resume: {
    position: { top: '2%', right: '6%' },
    size: { width: '19.5%', height: 'auto' },
    title: 'Click to view resume',
    text: '📄 Resume',
    modalType: 'resume',
  },
  timeline: {
    position: { bottom: '5%', left: '6%' },
    size: { width: '18%', height: 'auto' },
    title: 'Click to see journey',
    text: '📸 Timeline',
    modalType: 'timeline',
  },
  pin: {
    position: { top: '4%', left: '49%' },
    size: { width: '5%', height: 'auto' },
    title: 'Pin',
    hasClick: false,
    zindex: 80,
    modalType: 'pin',
  },
};

function LeisureMode({ onBackToHome }) {
  const [corkBoardZoomed, setCorkBoardZoomed] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [discoveredItems, setDiscoveredItems] = useState(new Set());
  const [isGlowing, setIsGlowing] = useState(false);
  const [glowTrigger, setGlowTrigger] = useState(0);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  // State to manage the onboarding interaction hint pop-up
  const [showHint, setShowHint] = useState(true);

  // Auto-hide the interaction hint after 4.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (!wrapperRef.current) return;
      
      const wrapperWidth = wrapperRef.current.clientWidth;
      const wrapperHeight = wrapperRef.current.clientHeight;

      const scaleX = wrapperWidth / CONTAINER_WIDTH;
      const scaleY = wrapperHeight / CONTAINER_HEIGHT;

      // Ensure the whole 1264x632 block fits without clipping
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    window.addEventListener('resize', calculateScale);
    // Tiny delay ensures React has painted the wrapper before measuring
    setTimeout(calculateScale, 10);

    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    if (lampOn && glowTrigger > 0) {
      setIsGlowing(true);
      const timer = setTimeout(() => {
        setIsGlowing(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [glowTrigger, lampOn]);

  const toggleCorkZoom = () => {
    setCorkBoardZoomed(!corkBoardZoomed);
  };

  const toggleLamp = () => {
    const newLampState = !lampOn;
    setLampOn(newLampState);
    if (newLampState) {
      setGlowTrigger(prev => prev + 1);
    } else {
      setIsGlowing(false);
    }
  };

  const openModal = (itemId) => {
    setActiveModal(itemId);
    setDiscoveredItems(prev => new Set([...prev, itemId]));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const createStyle = (config) => ({
    ...config.position,
    ...config.size,
  });

  return (
    <div className="leisure-mode-wrapper" ref={wrapperRef}>

      {/* PORTRAIT OVERLAY */}
      <div className="portrait-overlay">
        <div className="rotate-icon">📱 ➡️ 📟</div>
        <h2>Rotate Device</h2>
        <p>Please turn your phone to landscape mode to explore the desk.</p>
      </div>

      {/* Interactive Toast Notification Pop-up */}
      <div className={`interaction-toast ${showHint ? 'visible' : 'hidden'}`}>
        <span className="toast-icon">🔍</span>
        <div className="toast-text">
          <h4>Leisure Mode Active</h4>
          <p>Interact with the objects on the desk to discover information.</p>
        </div>
      </div>

      <button className={`back-btn ${corkBoardZoomed ? 'hidden' : ''}`} onClick={onBackToHome}>
        Change Mode
      </button>

      <div 
        className="leisure-fixed-container"
        style={{ 
          width: `${CONTAINER_WIDTH}px`,
          height: `${CONTAINER_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'absolute'
        }}
      >
        <div className="leisure-content">
          
          {/* ZOOMED OUT VIEW */}
          {!corkBoardZoomed && (
            <div className="normal-view">
              <div className="scene-background">
                <img src="/Desk background v1.png" alt="Desk background" />
              </div>

              {lampOn && (
                <div className="cork-board-glow" style={createStyle(CORK_BOARD_CONFIG.glow)}></div>
              )}

              <div 
                className="cork-board-zone"
                style={createStyle(CORK_BOARD_CONFIG.zone)}
                onClick={toggleCorkZoom}
                title="Click to examine cork board"
              ></div>
              
              {/* Lamp */}
              <div 
                className={`element lamp ${lampOn ? 'on' : 'off'}`}
                style={createStyle(DESK_ELEMENTS.lamp)}
                onClick={toggleLamp}
                title={DESK_ELEMENTS.lamp.title}
              >
                <img src={lampOn ? '/Lamp_on.png' : '/Lamp_off.png'} alt="Lamp Toggle" />
              </div>

              {/* Books - Hobbies */}
              <div 
                className={`element books ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.books)}
                onClick={() => openModal(DESK_ELEMENTS.books.modalType)}
                title={DESK_ELEMENTS.books.title}
              >
                <img src="/Books.png" alt="Books" />
              </div>

              {/* Phone - Contact */}
              <div 
                className={`element phone ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.phone)}
                onClick={() => openModal(DESK_ELEMENTS.phone.modalType)}
                title={DESK_ELEMENTS.phone.title}
              >
                <img src="/Phone.png" alt="Phone" />
              </div>

              {/* Laptop - Projects */}
              <div 
                className={`element laptop ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.laptop)}
                onClick={() => openModal(DESK_ELEMENTS.laptop.modalType)}
                title={DESK_ELEMENTS.laptop.title}
              >
                <img src="/Laptop2.png" alt="Laptop" />
              </div>

              {/* Globe */}
              <div 
                className={`element Globe ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.globe)}
                onClick={() => openModal(DESK_ELEMENTS.globe.modalType)}
                title={DESK_ELEMENTS.globe.title}
              >
                <img src="/Globe.png" alt="Globe" />
              </div>

              {/* Smoke Animation */}
              <div 
                className={`element smoke ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.smoke)}
                onClick={() => openModal(DESK_ELEMENTS.smoke.modalType)}
                title={DESK_ELEMENTS.smoke.title}
              >
                <img src="/Smoke.gif" alt="Smoke" />
              </div>

              {/* Coffee Mug */}
              <div 
                className={`element coffee-mug ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.coffeeMug)}
                onClick={() => openModal(DESK_ELEMENTS.coffeeMug.modalType)}
                title={DESK_ELEMENTS.coffeeMug.title}
              >
                <img src="/mug.png" alt="mug" />
              </div>

              {/* Hourglass */}
              <div 
                className={`element hourglass ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.hourglass)}
                onClick={() => openModal(DESK_ELEMENTS.hourglass.modalType)}
                title={DESK_ELEMENTS.hourglass.title}
              >
                <img src="/hourglass.png" alt="Hourglass" />
              </div>

              {/* Potato */}
              <div 
                className={`element potat ${isGlowing ? "glowing" : ""}`}
                style={createStyle(DESK_ELEMENTS.potat)}
                onClick={() => openModal(DESK_ELEMENTS.potat.modalType)}
                title={DESK_ELEMENTS.potat.title}
              >
                <img src="/potat.png" alt="Potat" />
              </div>

              {/* Static Decoration Assets */}
              <div className="element BookStack" style={createStyle(DESK_ELEMENTS.bookStack)} title={DESK_ELEMENTS.bookStack.title}>
                <img src="/Bookstack.png" alt="Book Stack" />
              </div>
              <div className="element news" style={createStyle(DESK_ELEMENTS.news)} title={DESK_ELEMENTS.news.title}>
                <img src="/news.png" alt="News" />
              </div>
            </div>
          )}

          {/* ZOOMED IN VIEW */}
          {corkBoardZoomed && (
            <div className="zoomed-view">
              <div className="cork-background-detailed">
                <img src="Cork_back.png" alt="Corkboard Background" />
              </div>

              <button className="close-buttonn" onClick={toggleCorkZoom}>×</button>

              <div 
                className={`cork-element wanted-poster ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.wantedPoster)}
                onClick={() => openModal(CORK_ELEMENTS.wantedPoster.modalType)}
                title={CORK_ELEMENTS.wantedPoster.title}
              >
                <img src="/wanted.png" alt="Wanted Poster" />
              </div>

              <div className="cork-element pin" style={createStyle(CORK_ELEMENTS.pin)} title={CORK_ELEMENTS.pin.title}>
                <img src="/pin.png" alt="Pin" />
              </div>    

              <div 
                className={`cork-element resume-doc ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.resume)}
                onClick={() => openModal(CORK_ELEMENTS.resume.modalType)}
                title={CORK_ELEMENTS.resume.title}
              >
                <img src="/resume.png" alt="Resume" />
              </div>

              <div 
                className={`cork-element timeline ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.timeline)}
                onClick={() => openModal(CORK_ELEMENTS.timeline.modalType)}
                title={CORK_ELEMENTS.timeline.title}
              >
                <img src="/timeline.png" alt="Timeline" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {activeModal && (
        <InfoCard type={activeModal} onClose={closeModal} />
      )}

      <ProgressBar 
        discovered={discoveredItems.size}
        total={10} 
        discoveredItems={discoveredItems}
        isHidden={corkBoardZoomed}
      />
    </div>
  );
}

export default LeisureMode;