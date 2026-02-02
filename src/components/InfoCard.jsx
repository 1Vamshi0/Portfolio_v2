import React from 'react';

const cardContent = {
  about: {
    title: "About Me",
    category: "PROFILE",
    content: "Detail-oriented and results-driven Data Science and Artificial Intelligence undergraduate with 3+ years of coding experience through academic and self-driven projects using Python, SQL, and machine learning frameworks. Collaborative and passionate about using data to build innovative, real-world solutions."
  },
  resume: {
    title: "Resume",
    category: "CURRICULUM VITAE",
    content: "Check out my full CV for a complete breakdown of my education and certifications"
  },
  timeline: {
    title: "Timeline",
    category: "HISTORY",
    content: "Work in progress... Coming soon!"
  },
  skills: {
    title: "Skills & Tools",
    category: "COMPETENCIES",
    content: "• Programming: Python, Java, JavaScript, C\n• Data & Backend: MongoDB, SQL, AWS\n• Web & Design: HTML5, CSS3, Figma\n• Core Strengths: Data Analytics, Cloud Deployment, DS & Algorithms"
  },
  contact: {
    title: "Contact Me",
    category: "GET IN TOUCH",
     content: null, // We'll handle this specially with links
    links: [
      { label: "Email", url: "mailto:akellakrishnavamshi@gmail.com", text: "akellakrishnavamshi@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/akella-krishna-vamshi/", text: "linkedin.com/akellakrishnavamshi" },
    ]
  },
  projects: {
    title: "Projects",
    category: "PORTFOLIO",
    content: "Project 1: Data Tales\nProject 2: Mock IPL Auction\nProject 3: Vamshi's Armoury (mini apps)"
  },
  hobby: {
    title: "Hobbies",
    category: "LEISURE",
    content: "Fueled by coffee and curiosity. I spend my free time designing, sketching, and fiddling with gadgets"
  }
};

function InfoCard({ type, onClose }) {
  // Fallback content if type doesn't exist
  const content = cardContent[type] || { 
    title: "Info", 
    category: "DETAILS", 
    content: "Details coming soon..." 
  };

  const handleDownloadResume = () => {
    window.open('/files/Akella Krishna Vamshi Resume.pdf', '_blank');
  };

  const handleRepositories = () => {
    window.open('https://github.com/1Vamshi0?tab=repositories', '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* The Rustic Card Container 
        e.stopPropagation ensures clicking the card doesn't close the modal 
      */}
      <div className="rustic-card" onClick={(e) => e.stopPropagation()}>
        <button className="rustic-close-btn" onClick={onClose}>×</button>

        {/* Card Header Section */}
        <div className="rustic-category">{content.category || "INFO"}</div>
        <h2 className="rustic-title">{content.title}</h2>
        {/* Decorative Divider */}
        <div className="rustic-divider"></div>

        {/* Card Body Content */}
        <div className="rustic-body">
          {type === 'contact' && content.links ? (
            content.links.map((link, index) => (
              <p key={index}>
                <strong>{link.label}:</strong>{' '}
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rustic-link"
                >
                  {link.text}
                </a>
              </p>
            ))
          ) : (
            /* Regular content for other cards */
            content.content && content.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))
          )}
        </div>
        {/* Action Buttons */}
        {type === 'resume' && (
          <button className="rustic-btn" onClick={handleDownloadResume}>
            View Resume
          </button>
        )}

        {type === 'projects' && (
          <button className="rustic-btn" onClick={handleRepositories}>
            View Repositories
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoCard;