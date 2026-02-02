import React, { useState } from 'react';

function ProgressBar({ discovered, total, discoveredItems, isHidden }) {
  const [showChecklist, setShowChecklist] = useState(false);

  const allItems = [
    { id: 'about', name: 'About Me',icon: '🖼️' },
    { id: 'resume', name: 'Resume Document', icon: '📰' },
    { id: 'skills', name: 'Skills', icon: '📚' },
    { id: 'contact', name: 'Contact', icon: '✉️' },
    { id: 'projects', name: 'Projects', icon: '💻' },
    { id: 'hobby', name: 'Hobbies', icon: '🖌️' },
    { id: 'timeline', name: 'Timeline', icon: '🚎' }
  ];

  // Calculate circle progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (discovered / total) * 100;
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
            <span className="progress-text">{discovered}/{total}</span>
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
              <p>{discovered} of {total} discovered</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgressBar;