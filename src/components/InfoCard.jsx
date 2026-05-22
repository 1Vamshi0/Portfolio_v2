import React from 'react';

const cardContent = {
  about: {
    title: "The Blueprint",
    category: "THE HUMAN",
    content: "I’m someone who is chronically incapable of opening an application, using a product, or looking at a piece of media without completely tearing apart its UI/UX and functionality in my head. I have a deep love for clean lines, sharp logic, and building things that make people say, 'Oh, that’s smooth.' This room is essentially what the inside of my brain looks like."
  },
  resume: {
    title: "The Paperwork",
    category: "THE PAPERWORK",
    content: "Looking for the official, ultra-polished, business-ready document?\n\nClick the download button below to grab the full CV asset directly. Otherwise, feel free to keep exploring the desk!"
  },
  timeline: {
    title: "The Time Machine",
    category: "HISTORY",
    content: "Work in progress... Coming soon!\n\nCurrently trying to compile my life timeline, but it's stuck in an infinite rendering loop. Check back after a few cups of coffee."
  },
  contact: {
    title: "The Frequency",
    category: "DIRECT LINE",
    content: null, // Handled specially via links mapping below
    links: [
      { label: "Email", url: "mailto:akellakrishnavamshi@gmail.com", text: "akellakrishnavamshi@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/akella-krishna-vamshi/", text: "linkedin.com/akellakrishnavamshi" },
    ]
  },
  projects: {
    title: "The Side Quests",
    category: "THE SANDBOX",
    content: "Welcome to the digital sandbox. This is where I dump things I built late at night just to see if I could make them happen. No rigid classroom guidelines or template assignments here—just code experiments, interactive puzzles, and functional mini-apps born out of pure boredom and curiosity."
  },
  hobby: {
    title: "The Analog Spectrum",
    category: "UNPLUGGED",
    content: "When the screen gets a little too loud, I pull the plug and switch modes entirely. My offline time is built around creative exploration: sketching out digital graphics, painting, analyzing visual branding, or opening up electronics just to see how they tick. Balance is key, and curiosity doesn't stop when the laptop closes."
  },
  globe: {
    title: "Flat Earth Simulator",
    category: "DISCOVERY",
    content: "You spun the globe! Congratulations, you landed on a pixelated patch of the North Atlantic Ocean.\n\nIf you were looking for an exotic travel itinerary, I'm currently docked right here at this desk. Spin again whenever you need a quick mental vacation from reality."
  },
  hourglass: {
    title: "The Productivity Guilt-Trip",
    category: "EXISTENTIAL",
    content: "Legends say every time you click this, an absolute second passes in real life.\n\nYou are actively watching digital sand slide away while staring at a 2D potato and a glowing lamp. Honestly? I deeply respect your commitment to avoiding real work today."
  },
  potat: {
    title: "Potat.jsx",
    category: "SUDO SPUD",
    content: "Easily the most optimized element on this screen. Zero lines of code, zero server overhead, 100% pure starch.\n\nIt doesn't run complex algorithms; it just sits there, being completely a-peeling. Every solid development environment needs a load-bearing vegetable."
  },
  smoke: {
    title: "The Vibe Check",
    category: "ATMOSPHERE",
    content: "If you lean close enough to your monitor, you still won’t smell the fresh coffee beans.\n\nThis loop is just here to provide optimal, cozy lo-fi study vibes to keep the room's aesthetic aesthetic. Do not try to sip the glass."
  },
  coffeeMug: {
    title: "The Chemical Reactor",
    category: "FUEL STATION",
    content: "A dark, mysterious liquid that successfully converts raw curiosity into functional layouts, clean vectors, and late-night inspiration loops.\n\nSide effects include an intense hatred for Comic Sans. Currently 100% organic and vegetarian approved."
  }
};

function InfoCard({ type, onClose }) {
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
      <div className="rustic-card" onClick={(e) => e.stopPropagation()}>
        <button className="rustic-close-btn" onClick={onClose}>×</button>
        <div className="rustic-category">{content.category || "INFO"}</div>
        <h2 className="rustic-title">{content.title}</h2>
        <div className="rustic-divider"></div>

        <div className="rustic-body">
          {type === 'contact' && content.links ? (
            content.links.map((link, index) => (
              <p key={index}>
                <strong>{link.label}:</strong>{' '}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="rustic-link">
                  {link.text}
                </a>
              </p>
            ))
          ) : (
            content.content && content.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))
          )}
        </div>

        {type === 'resume' && (
          <button className="rustic-btn" onClick={handleDownloadResume}>
            📄 Access the Sacred Scroll (PDF)
          </button>
        )}

        {type === 'projects' && (
          <button className="rustic-btn" onClick={handleRepositories}>
            🐙 Inspect the Sandbox Repos
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoCard;