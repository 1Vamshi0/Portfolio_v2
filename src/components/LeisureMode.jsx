/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ProgressBar from './ProgressBar';

// ============================================
// FIXED CONTAINER CONFIGURATION
// ============================================
// Your exact design dimensions - locked at these values
const CONTAINER_WIDTH = 1264;
const CONTAINER_HEIGHT = 632;

// All measurements in PIXELS - keeping your exact current layout
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
    modalType: 'skills',
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
    hasClick: false,
  },
  globe: {
    position: { bottom: '107px', right: '632px' },
    size: { width: '130px', height: 'auto' },
    title: 'Globe',
    hasClick: false,
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
    hasClick: false,
  },
  potat: {
    position: { bottom: '32px', right: '164px' },
    size: { width: '150px', height: 'auto' },
    title: 'Potato',
    hasClick: false,
  },
  smoke: {
    position: { bottom: '133px', right: '88px' },
    size: { width: '40px', height: 'auto' },
    title: 'Smoke',
    hasClick: false,
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
  penHolder: {
    position: { bottom: '6%', right: '17%' },
    size: { width: '15%', height: 'auto' },
    title: 'Click to see Skills',
    hasClick: true,
    modalType: 'hobby',
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

// ============================================
// COMPONENT
// ============================================

function LeisureMode({ onBackToHome }) {
  const [corkBoardZoomed, setCorkBoardZoomed] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [discoveredItems, setDiscoveredItems] = useState(new Set());
  const [isGlowing, setIsGlowing] = useState(false);
  const [glowTrigger, setGlowTrigger] = useState(0);

  // Effect to trigger glow when lamp is turned on
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
      setGlowTrigger(prev => prev + 1); // Trigger glow animation
    } else {
      setIsGlowing(false); // Immediately stop glow when turning off
    }
  };

  const openModal = (itemId) => {
    setActiveModal(itemId);
    setDiscoveredItems(prev => new Set([...prev, itemId]));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Helper function to create style object from config
  const createStyle = (config) => ({
    ...config.position,
    ...config.size,
  });

  return (
    <div className="leisure-mode-wrapper">
      {/* Back to Home Button - Fixed to viewport */}
      <button className={`back-btn ${corkBoardZoomed ? 'hidden' : ''}`} onClick={onBackToHome}>
        Change Mode
      </button>

      {/* Fixed-size container - letterboxing will appear on different screen sizes */}
      <div className="leisure-fixed-container">
        <div className="leisure-content">
          
          {/* ZOOMED OUT VIEW - Normal Desk Scene */}
          {!corkBoardZoomed && (
            <div className="normal-view">
              {/* Background Image */}
              <div className="scene-background">
                <img src="/Desk background v1.png" alt="Desk background" />
              </div>

              {/* Cork board glow overlay (only when lamp is ON) */}
              {lampOn && (
                <div 
                  className="cork-board-glow"
                  style={createStyle(CORK_BOARD_CONFIG.glow)}
                ></div>
              )}

              {/* Cork board clickable zone */}
              <div 
                className="cork-board-zone"
                style={createStyle(CORK_BOARD_CONFIG.zone)}
                onClick={toggleCorkZoom}
                title="Click to examine cork board"
              ></div>

              {/* DESK ELEMENTS */}
              
              {/* Lamp */}
              <div 
                className={`element lamp ${lampOn ? 'on' : 'off'}`}
                style={createStyle(DESK_ELEMENTS.lamp)}
                onClick={toggleLamp}
                title={DESK_ELEMENTS.lamp.title}
              >
                <img 
                  src={lampOn ? '/Lamp_on.png' : '/Lamp_off.png'} 
                  alt={lampOn ? 'Lamp ON' : 'Lamp OFF'}
                />
              </div>

              {/* Books - Hobby */}
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
                className={`element Globe `}
                style={createStyle(DESK_ELEMENTS.globe)}
                title={DESK_ELEMENTS.globe.title}
              >
                <img src="/Globe.png" alt="Globe" />
              </div>

              {/* Smoke Animation */}
              <div 
                className={`element smoke `}
                style={createStyle(DESK_ELEMENTS.smoke)}
                title={DESK_ELEMENTS.smoke.title}
              >
                <img src="/Smoke.gif" alt="Smoke" />
              </div>

              {/* Coffee Mug */}
              <div 
                className={`element coffee-mug `}
                style={createStyle(DESK_ELEMENTS.coffeeMug)}
                title={DESK_ELEMENTS.coffeeMug.title}
              >
                <img src="/mug.png" alt="mug" />
              </div>

              {/* Book Stack */}
              <div 
                className={`element BookStack`}
                style={createStyle(DESK_ELEMENTS.bookStack)}
                title={DESK_ELEMENTS.bookStack.title}
              >
                <img src="/Bookstack.png" alt="Book Stack" />
              </div>

              {/* News */}
              <div 
                className={`element news`}
                style={createStyle(DESK_ELEMENTS.news)}
                title={DESK_ELEMENTS.news.title}
              >
                <img src="/news.png" alt="News" />
              </div>

              {/* Hourglass */}
              <div 
                className={`element hourglass`}
                style={createStyle(DESK_ELEMENTS.hourglass)}
                title={DESK_ELEMENTS.hourglass.title}
              >
                <img src="/hourglass.png" alt="Hourglass" />
              </div>

              {/* Potato */}
              <div 
                className={`element potat`}
                style={createStyle(DESK_ELEMENTS.potat)}
                title={DESK_ELEMENTS.potat.title}
              >
                <img src="/potat.png" alt="Potat" />
              </div>
            </div>
          )}

          {/* ZOOMED IN VIEW - Cork Board Only */}
          {corkBoardZoomed && (
            <div className="zoomed-view">
              {/* Cork board detailed background */}
              <div className="cork-background-detailed">
                <img src="Cork_back.png" alt="" />
              </div>

              {/* Back button */}
              <button 
                className="close-buttonn"
                onClick={toggleCorkZoom}
              >
               ×
              </button>

              {/* CORK BOARD ELEMENTS */}
              
              {/* Wanted Poster - About Me */}
              <div 
                className={`cork-element wanted-poster ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.wantedPoster)}
                onClick={() => openModal(CORK_ELEMENTS.wantedPoster.modalType)}
                title={CORK_ELEMENTS.wantedPoster.title}
              >
                <img src="/wanted.png" alt="Wanted Poster" />
              </div>

              <div 
                className={`cork-element pin ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.pin)}
                onClick={() => openModal(CORK_ELEMENTS.pin.modalType)}
                title={CORK_ELEMENTS.pin.title}
              >
                <img src="/pin.png" alt="Pin" />
              </div>    

              {/* Resume Document */}
              <div 
                className={`cork-element resume-doc ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.resume)}
                onClick={() => openModal(CORK_ELEMENTS.resume.modalType)}
                title={CORK_ELEMENTS.resume.title}
              >
                <img src="/resume.png" alt="Resume" />
              </div>

              {/* Photo Timeline - Education */}
              <div 
                className={`cork-element timeline ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.timeline)}
                onClick={() => openModal(CORK_ELEMENTS.timeline.modalType)}
                title={CORK_ELEMENTS.timeline.title}
              >
                <img src="/timeline.png" alt="Timeline" />
              </div>
              {/* Pen Holder - Skills */}
              <div 
                className={`cork-element pen-holder ${isGlowing ? "glowing" : ""}`}
                style={createStyle(CORK_ELEMENTS.penHolder)}
                onClick={() => openModal(CORK_ELEMENTS.penHolder.modalType)}
                title={CORK_ELEMENTS.penHolder.title}
              >
                <img src="/skills.png" alt="Skills" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for displaying info */}
      {activeModal && (
        <InfoCard 
          type={activeModal}
          onClose={closeModal}
        />
      )}

      {/* Progress Bar */}
      <ProgressBar 
        discovered={discoveredItems.size}
        total={7}
        discoveredItems={discoveredItems}
        isHidden={corkBoardZoomed}
      />
    </div>
  );
}

export default LeisureMode;