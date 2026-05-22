import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Courier+New:wght@400;700&display=swap');

  .rm-root {
    min-height: 100vh;
    background: #e8e8e8; /* Matches the concrete/slate tone of the landing blueprint */
    color: #222222; /* High-contrast crisp technical text */
    font-family: 'Courier New', monospace;
    font-size: 14px;
    padding-bottom: 60px;
  }

  /* ── Structural Header HUD ── */
  .rm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;
    background: #dcdcdc; /* Blends perfectly with your graph paper grid base */
    border-bottom: 2px solid #b5b5b5;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .rm-mode-label {
    font-size: 13px;
    font-weight: bold;
    color: #e64a19; /* Your signature technical orange accent */
    letter-spacing: 2px;
  }

  .rm-change-mode {
    background: #e8e8e8;
    border: 1px solid #b5b5b5;
    color: #222222;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    font-weight: bold;
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rm-change-mode:hover {
    border-color: #e64a19;
    color: #e64a19;
    background: #ffffff;
  }

  /* ── Technical Profile Summary ── */
  .rm-hero {
    background: #dcdcdc;
    border-bottom: 2px solid #b5b5b5;
    padding: 50px 40px;
    position: relative;
  }

  /* Infuses the identical subtle graph-paper grid lines from your landing page */
  .rm-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  .rm-hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .rm-hero h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 38px;
    font-weight: 700;
    color: #111111;
    margin: 0 0 8px;
    letter-spacing: -1px;
  }

  .rm-hero-sub {
    font-size: 13px;
    color: #555555;
    margin: 0;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .rm-resume-btn {
    display: inline-block;
    padding: 12px 24px;
    background: #222222;
    border: 2px solid #222222;
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.2s;
    letter-spacing: 1px;
  }

  .rm-resume-btn:hover {
    background: transparent;
    color: #222222;
    border-color: #e64a19;
    box-shadow: 4px 4px 0 rgba(230, 74, 25, 0.15);
  }

  /* ── Engineering Control Navigation ── */
  .rm-nav {
    background: #dcdcdc;
    border-bottom: 2px solid #b5b5b5;
    padding: 0 40px;
    overflow-x: auto;
  }

  .rm-nav-inner {
    display: flex;
    max-width: 900px;
    margin: 0 auto;
  }

  .rm-nav-btn {
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: #666666;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    font-weight: bold;
    padding: 16px 24px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
  }

  .rm-nav-btn:hover {
    color: #111111;
  }

  .rm-nav-btn.active {
    color: #111111;
    border-bottom-color: #e64a19;
    background: rgba(230, 74, 25, 0.04);
  }

  /* ── Workspace Container ── */
  .rm-content {
    padding: 50px 40px;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Modular Component Headings ── */
  .rm-section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #111111;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #b5b5b5;
    letter-spacing: 0.5px;
  }

  .rm-section-gap {
    margin-top: 50px;
  }

  /* ── Systems Projects Terminal ── */
  .rm-project-list {
    display: flex;
    flex-direction: column;
    border: 2px solid #b5b5b5;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .rm-project-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid #b5b5b5;
    text-decoration: none;
    color: inherit;
    gap: 16px;
    background: #ffffff;
    transition: all 0.2s;
  }

  .rm-project-row:last-child {
    border-bottom: none;
  }

  .rm-project-row:hover {
    background: #f5f5f5;
    border-left: 4px solid #e64a19;
    padding-left: 16px;
  }

  .rm-project-name {
    font-size: 15px;
    font-weight: bold;
    color: #111111;
  }

  .rm-project-link-icon {
    font-size: 12px;
    color: #e64a19;
    margin-left: 6px;
  }

  .rm-project-stack {
    font-size: 12px;
    color: #555555;
    font-weight: bold;
  }

  /* ── Matrix Core Competencies ── */
  .rm-comp-list {
    display: flex;
    flex-direction: column;
    border: 2px solid #b5b5b5;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .rm-comp-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 20px;
    padding: 16px 20px;
    border-bottom: 1px solid #b5b5b5;
    background: #ffffff;
  }

  .rm-comp-row:last-child {
    border-bottom: none;
  }

  .rm-comp-label {
    font-size: 12px;
    font-weight: bold;
    color: #e64a19;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .rm-comp-value {
    font-size: 13px;
    color: #333333;
    line-height: 1.6;
    font-weight: bold;
  }

  /* ── Timeline Trackers ── */
  .rm-exp-list {
    display: flex;
    flex-direction: column;
    border: 2px solid #b5b5b5;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .rm-exp-item {
    padding: 22px 20px;
    border-bottom: 1px solid #b5b5b5;
    background: #ffffff;
  }

  .rm-exp-item:last-child {
    border-bottom: none;
  }

  .rm-exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
    gap: 12px;
  }

  .rm-exp-role {
    font-size: 15px;
    font-weight: bold;
    color: #111111;
  }

  .rm-exp-date {
    font-size: 12px;
    color: #666666;
    font-weight: bold;
  }

  .rm-exp-company {
    font-size: 13px;
    color: #e64a19;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .rm-exp-stack {
    font-size: 12px;
    color: #555555;
    font-weight: bold;
  }

  /* ── Biography / Analytics Profiles ── */
  .rm-bio {
    font-size: 14px;
    line-height: 1.8;
    color: #222222;
    margin: 0;
    padding: 22px 20px;
    background: #ffffff;
    border: 2px solid #b5b5b5;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
    font-weight: bold;
  }

  /* ── Interactive Skill Modules ── */
  .rm-skill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 15px;
  }

  .rm-skill-card {
    padding: 16px;
    background: #ffffff;
    border: 2px solid #b5b5b5;
    border-left: 4px solid #e64a19;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .rm-skill-label {
    font-size: 14px;
    font-weight: bold;
    color: #111111;
  }

  .rm-skill-desc {
    font-size: 12px;
    color: #555555;
    line-height: 1.5;
    font-weight: bold;
  }

  /* ── Security Routed Contact Subsystem ── */
  .rm-contact-list {
    display: flex;
    flex-direction: column;
    border: 2px solid #b5b5b5;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .rm-contact-row {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    border-bottom: 1px solid #b5b5b5;
    text-decoration: none;
    color: inherit;
    gap: 20px;
    background: #ffffff;
    transition: all 0.2s;
  }

  .rm-contact-row:last-child {
    border-bottom: none;
  }

  .rm-contact-row:hover {
    background: #f5f5f5;
  }

  .rm-contact-row:hover .rm-contact-value {
    color: #e64a19;
  }

  .rm-contact-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8e8e8;
    border: 1px solid #b5b5b5;
    color: #e64a19;
  }

  .rm-contact-icon svg {
    width: 16px;
    height: 16px;
  }

  .rm-contact-platform {
    font-size: 12px;
    font-weight: bold;
    color: #666666;
    width: 80px;
    flex-shrink: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .rm-contact-value {
    font-size: 14px;
    font-weight: bold;
    color: #111111;
    transition: color 0.15s;
  }

  /* ── Responsive Architecture Overrides ── */
  @media (max-width: 600px) {
    .rm-topbar, .rm-hero, .rm-nav, .rm-content { padding-left: 20px; padding-right: 20px; }
    .rm-hero h1 { font-size: 28px; }
    .rm-comp-row { grid-template-columns: 1fr; gap: 4px; }
    .rm-exp-header { flex-direction: column; gap: 4px; }
    .rm-nav-btn { padding: 12px 14px; }
    .rm-hero-inner { flex-direction: column; align-items: flex-start; gap: 15px; }
  }
`;

function RecruiterMode({ onBackToHome }) {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: '// ABOUT' },
    { id: 'projects', label: '// PROJECTS' },
    { id: 'internships', label: '// EXPERIENCE' },
    { id: 'contact', label: '// CONTACT' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="rm-root">

        {/* Top bar */}
        <div className="rm-topbar">
          <span className="rm-mode-label">SYSTEM_BLUEPRINT // EXECUTIVE_VIEW</span>
          <button className="rm-change-mode" onClick={onBackToHome}>RETURN_HOME ↖</button>
        </div>

        {/* Hero */}
        <div className="rm-hero">
          <div className="rm-hero-inner">
            <div>
              <h1>Akella Krishna Vamshi</h1>
              <p className="rm-hero-sub">DATA_SCIENCE &amp; AI UNDERGRADUATE </p>
            </div>
            <a
              href="/files/Akella Krishna Vamshi Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rm-resume-btn"
            >
              DOWNLOAD_RESUME ↗
            </a>
          </div>
        </div>

        {/* Nav */}
        <nav className="rm-nav">
          <div className="rm-nav-inner">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`rm-nav-btn${activeSection === item.id ? ' active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="rm-content">

          {/* ── PROJECTS ── */}
          {activeSection === 'projects' && (
            <div>
              <p className="rm-section-title">CORE PROJECTS</p>
              <div className="rm-project-list">
                <a href="https://github.com/1Vamshi0/Lens" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Lens <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">ReactJS · Puppetry · Node.js</span>
                </a>
                <a href="https://github.com/1Vamshi0/Mock-IPL-Auction" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Mock IPL Auction <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">Python · JavaScript</span>
                </a>
                <a href="https://github.com/1Vamshi0/Data-Tales" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Data Tales Analysis Console <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">Python · Flask · MongoDB </span>
                </a>
                
              </div>

              <div className="rm-section-gap">
                <p className="rm-section-title">CORE COMPETENCIES </p>
                <div className="rm-comp-list">
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Languages</span>
                    <span className="rm-comp-value">Python, JavaScript, SQL, C, Java</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Tools &amp; Frameworks</span>
                    <span className="rm-comp-value">React, Node.js, HTML5, CSS3, MongoDB, REST APIs, Git, Figma</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Technical Strengths</span>
                    <span className="rm-comp-value">Data Analysis Systems, UI/UX Functionality, SEO Engineering, Production Cloud Deployment</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Methodologies</span>
                    <span className="rm-comp-value">Agile Architecture, Version Control Systems, Quantitative Modeling</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EXPERIENCE ── */}
          {activeSection === 'internships' && (
            <div>
              <p className="rm-section-title">PROFESSIONAL TIMELINE</p>
              <div className="rm-exp-list">
                <div className="rm-exp-item">
                  <div className="rm-exp-header">
                    <span className="rm-exp-role">Software Development Intern</span>
                    <span className="rm-exp-date">Jan 2026 – Present</span>
                  </div>
                  <div className="rm-exp-company">AdAnvil </div>
                  <div className="rm-exp-stack">React · JavaScript · Web Crawling </div>
                </div>
                <div className="rm-exp-item">
                  <div className="rm-exp-header">
                    <span className="rm-exp-role">Digital Marketing &amp; SEO Analyst Intern</span>
                    <span className="rm-exp-date">July 2025 – August 2025</span>
                  </div>
                  <div className="rm-exp-company">QI Media</div>
                  <div className="rm-exp-stack">Search Analytics · On-Page SEO Systems · Performance Monitoring</div>
                </div>
              </div>

              <div className="rm-section-gap">
                <p className="rm-section-title">CAMPUS LEADERSHIP</p>
                <div className="rm-exp-list">
                  <div className="rm-exp-item">
                    <div className="rm-exp-header">
                      <span className="rm-exp-role">President</span>
                      <span className="rm-exp-date">May 2024 – May 2025</span>
                    </div>
                    <div className="rm-exp-company">ICFAI Tech Entrepreneurship Club (ITEC)</div>
                  </div>
                  <div className="rm-exp-item">
                    <div className="rm-exp-header">
                      <span className="rm-exp-role">Vice President</span>
                      <span className="rm-exp-date">Aug 2023 – May 2024</span>
                    </div>
                    <div className="rm-exp-company">ICFAI Tech Entrepreneurship Club (ITEC)</div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {activeSection === 'about' && (
            <div>
              <p className="rm-section-title">ABOUT ME</p>
              <p className="rm-bio">
                B.Tech Data Science & AI student at ICFAI Hyderabad  | Software & Design Enthusiast. 
                I'm a collaborative builder focused on solving real-world problems through data, design, and strategic leadership.
                 Passionate about the "why" behind the code and dedicated to creating value through collective growth and unconventional ideas.

              </p>
              <div className="rm-section-gap">
                <p className="rm-section-title">SOFT SKILLS</p>
                <div className="rm-skill-grid">
                  {[
                  { 
                    label: 'Strategic Thinking', 
                    desc: 'I connect the dots between data, design, and business outcomes to drive intentional product decisions.' 
                  },
                  { 
                    label: 'Collaborative Builder', 
                    desc: 'I thrive in cross-functional teams and have a proven record of leading over 50+ members as a club President.' 
                  },
                  { 
                    label: 'Creative Problem Solver', 
                    desc: 'I am drawn to unconventional approaches and rely on first-principles thinking to break down complex challenges.' 
                  },
                  { 
                    label: 'Adaptable', 
                    desc: 'I transition fluidly across development, UI/UX design, marketing, and leadership roles depending on what the project needs.' 
                  },
                  { 
                    label: 'Proactive', 
                    desc: 'I am entirely self-driven, consistently initiating and pursuing technical and strategy projects beyond my formal coursework.' 
                  },
                  { 
                    label: 'Clear Communicator', 
                    desc: 'I translate complex technical concepts and underlying data states into highly accessible, impact-driven language.' 
                  },
                  ].map(s => (
                    <div key={s.label} className="rm-skill-card">
                      <span className="rm-skill-label">{s.label}</span>
                      <span className="rm-skill-desc">{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CONTACT ── */}
          {activeSection === 'contact' && (
            <div>
              <p className="rm-section-title">CONTACT</p>
              <div className="rm-contact-list">
                <a href="https://www.linkedin.com/in/akella-krishna-vamshi/" target="_blank" rel="noreferrer" className="rm-contact-row">
                  <span className="rm-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  <span className="rm-contact-platform">LinkedIn</span>
                  <span className="rm-contact-value">akella-krishna-vamshi ↗</span>
                </a>
                <a href="https://github.com/1Vamshi0?tab=repositories" target="_blank" rel="noreferrer" className="rm-contact-row">
                  <span className="rm-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </span>
                  <span className="rm-contact-platform">GitHub</span>
                  <span className="rm-contact-value">1Vamshi0 ↗</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default RecruiterMode;