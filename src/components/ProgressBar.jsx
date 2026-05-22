import React, { useState } from 'react';

function ProgressBar({ discovered, discoveredItems, isHidden }) {
  const [showChecklist, setShowChecklist] = useState(false);

  // Updated to exactly match the 11 modal types from LeisureMode.jsx
  const allItems = [
    { id: 'about', name: 'Wanted Poster (About)', icon: '🎯' },
    { id: 'resume', name: 'Resume', icon: '📄' },
    { id: 'timeline', name: 'Timeline', icon: '📸' },
    { id: 'hobby', name: 'Books (Hobbies)', icon: '📚' },
    { id: 'contact', name: 'Phone (Contact)', icon: '📱' },
    { id: 'projects', name: 'Laptop (Projects)', icon: '💻' },
    { id: 'globe', name: 'Globe', icon: '🌍' },
    { id: 'coffeeMug', name: 'Coffee Mug', icon: '☕' },
    { id: 'hourglass', name: 'Hourglass', icon: '⏳' },
    { id: 'potat', name: 'Potato', icon: '🥔' },
    { id: 'smoke', name: 'Smoke', icon: '💨' }
  ];

  // Dynamically use the length of the array so it's always perfectly accurate
  const accurateTotal = allItems.length;

  // Calculate circle progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (discovered / accurateTotal) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className={`progress-bar ${isHidden ? 'hidden' : ''}`}>
        <div className="circular-progress">
          {/* SVG Circle */}
          <svg width="140" height="140">
            {/* Background circle */}
            <circle
              className="progress-circle-bg"
              cx="70"
              cy="70"
              r={radius}
            />
            {/* Progress circle */}
            <circle
              className="progress-circle-fill"
              cx="70"
              cy="70"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          
          {/* Center button */}
          <button 
            className="checklist-button"
            onClick={() => setShowChecklist(!showChecklist)}
          >
            <span className="progress-text">{discovered}/{accurateTotal}</span>
            <span className="progress-label">Items</span>
          </button>
        </div>
      </div>

      {/* Checklist Modal */}
      {showChecklist && (
        <div className="modal-overlay" onClick={() => setShowChecklist(false)}>
          <div className="checklist-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowChecklist(false)}>×</button>
            <h2>Checklist</h2>
            <div className="checklist-items">
              {allItems.map(item => (
                <div 
                  key={item.id}
                  className={`checklist-item ${discoveredItems.has(item.id) ? 'discovered' : ''}`}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-status">
                    {discoveredItems.has(item.id) ? '✓' : '○'}
                  </span>
                </div>
              ))}
            </div>
            <div className="checklist-footer">
              <p>{discovered} of {accurateTotal} discovered</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgressBar;