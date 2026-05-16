import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap');

  .rm-root {
    min-height: 100vh;
    background: #f5f0e8;
    color: #2c2416;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 15px;
  }

  /* ── Top bar ── */
  .rm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    background: #2c2416;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .rm-mode-label {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: #c9a96e;
    letter-spacing: 0.5px;
  }

  .rm-change-mode {
    background: transparent;
    border: 1px solid #5a4a30;
    color: #a08060;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rm-change-mode:hover {
    border-color: #c9a96e;
    color: #c9a96e;
  }

  /* ── Hero ── */
  .rm-hero {
    background: #fff8ee;
    border-bottom: 2px solid #d9c9a8;
    padding: 44px 40px 32px;
  }

  .rm-hero-inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 860px;
    margin: 0 auto;
  }

  .rm-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 700;
    color: #2c2416;
    margin: 0 0 6px;
    line-height: 1.1;
  }

  .rm-hero-sub {
    font-size: 15px;
    color: #7a6040;
    margin: 0;
    font-weight: 600;
  }

  .rm-resume-btn {
    display: inline-block;
    padding: 11px 24px;
    background: #2c2416;
    color: #c9a96e;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .rm-resume-btn:hover {
    background: #4a3820;
  }

  /* ── Nav ── */
  .rm-nav {
    background: #fff8ee;
    border-bottom: 2px solid #d9c9a8;
    padding: 0 40px;
    overflow-x: auto;
  }

  .rm-nav-inner {
    display: flex;
    max-width: 860px;
    margin: 0 auto;
  }

  .rm-nav-btn {
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: #9a7a50;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 14px 22px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
    margin-bottom: -2px;
  }

  .rm-nav-btn:hover {
    color: #2c2416;
  }

  .rm-nav-btn.active {
    color: #2c2416;
    border-bottom-color: #c9a96e;
  }

  /* ── Content ── */
  .rm-content {
    padding: 40px;
    max-width: 860px;
    margin: 0 auto;
  }

  /* ── Section heading ── */
  .rm-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #2c2416;
    margin: 0 0 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #d9c9a8;
  }

  .rm-section-gap {
    margin-top: 40px;
  }

  /* ── Projects ── */
  .rm-project-list {
    display: flex;
    flex-direction: column;
  }

  .rm-project-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 14px;
    border-bottom: 1px solid #e0d4b8;
    text-decoration: none;
    color: inherit;
    gap: 16px;
    background: transparent;
    transition: background 0.15s;
  }

  .rm-project-row:nth-child(odd) {
    background: #fdf7ec;
  }

  .rm-project-row:hover {
    background: #fff0d4;
  }

  .rm-project-row:hover .rm-project-name {
    color: #8b5e2a;
  }

  .rm-project-name {
    font-size: 16px;
    font-weight: 700;
    color: #2c2416;
    transition: color 0.15s;
  }

  .rm-project-link-icon {
    font-size: 13px;
    color: #c9a96e;
    margin-left: 4px;
  }

  .rm-project-stack {
    font-size: 13px;
    color: #7a6040;
    font-weight: 600;
    white-space: nowrap;
  }

  /* ── Competencies ── */
  .rm-comp-list {
    display: flex;
    flex-direction: column;
  }

  .rm-comp-row {
    display: grid;
    grid-template-columns: 170px 1fr;
    gap: 16px;
    padding: 13px 14px;
    border-bottom: 1px solid #e0d4b8;
    align-items: start;
  }

  .rm-comp-row:nth-child(odd) {
    background: #fdf7ec;
  }

  .rm-comp-label {
    font-size: 13px;
    font-weight: 700;
    color: #7a6040;
    padding-top: 1px;
  }

  .rm-comp-value {
    font-size: 14px;
    color: #2c2416;
    font-weight: 600;
    line-height: 1.6;
  }

  /* ── Experience ── */
  .rm-exp-list {
    display: flex;
    flex-direction: column;
  }

  .rm-exp-item {
    padding: 18px 14px;
    border-bottom: 1px solid #e0d4b8;
  }

  .rm-exp-item:nth-child(odd) {
    background: #fdf7ec;
  }

  .rm-exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3px;
    gap: 12px;
  }

  .rm-exp-role {
    font-size: 16px;
    font-weight: 700;
    color: #2c2416;
  }

  .rm-exp-date {
    font-size: 13px;
    color: #9a7a50;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .rm-exp-company {
    font-size: 14px;
    color: #8b5e2a;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .rm-exp-stack {
    font-size: 13px;
    color: #7a6040;
    font-weight: 600;
  }

  /* ── About ── */
  .rm-bio {
    font-size: 15px;
    line-height: 1.8;
    color: #3a2e1e;
    font-weight: 400;
    margin: 0;
    padding: 18px 14px;
    background: #fdf7ec;
    border-bottom: 1px solid #e0d4b8;
  }

  .rm-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 14px;
  }

  .rm-tag {
    font-size: 13px;
    font-weight: 700;
    padding: 5px 14px;
    background: #fff8ee;
    border: 1.5px solid #c9a96e;
    color: #6a4820;
  }

  /* ── Soft Skills ── */
  .rm-skill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
    padding: 4px 0;
  }

  .rm-skill-card {
    padding: 14px 16px;
    background: #fff8ee;
    border: 1.5px solid #d9c9a8;
    border-left: 4px solid #c9a96e;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .rm-skill-label {
    font-size: 14px;
    font-weight: 700;
    color: #2c2416;
  }

  .rm-skill-desc {
    font-size: 13px;
    color: #7a6040;
    line-height: 1.5;
  }


  .rm-contact-list {
    display: flex;
    flex-direction: column;
  }

  .rm-contact-row {
    display: flex;
    align-items: center;
    padding: 16px 14px;
    border-bottom: 1px solid #e0d4b8;
    text-decoration: none;
    color: inherit;
    gap: 20px;
    transition: background 0.15s;
  }

  .rm-contact-row:nth-child(odd) {
    background: #fdf7ec;
  }

  .rm-contact-row:hover {
    background: #fff0d4;
  }

  .rm-contact-row:hover .rm-contact-value {
    color: #8b5e2a;
  }

  .rm-contact-icon {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff8ee;
    border: 1.5px solid #c9a96e;
    color: #8b5e2a;
  }

  .rm-contact-icon svg {
    width: 18px;
    height: 18px;
  }


    font-size: 13px;
    font-weight: 700;
    color: #9a7a50;
    width: 80px;
    flex-shrink: 0;
  }

  .rm-contact-value {
    font-size: 15px;
    font-weight: 600;
    color: #2c2416;
    transition: color 0.15s;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .rm-topbar, .rm-hero, .rm-nav, .rm-content { padding-left: 18px; padding-right: 18px; }
    .rm-hero h1 { font-size: 28px; }
    .rm-comp-row { grid-template-columns: 1fr; gap: 2px; }
    .rm-exp-header { flex-direction: column; gap: 2px; }
    .rm-nav-btn { padding: 12px 14px; }
    .rm-hero-inner { flex-direction: column; align-items: flex-start; }
  }
`;

function RecruiterMode({ onBackToHome }) {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'internships', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="rm-root">

        {/* Top bar */}
        <div className="rm-topbar">
          <span className="rm-mode-label">Recruiter Mode</span>
          <button className="rm-change-mode" onClick={onBackToHome}>Change Mode</button>
        </div>

        {/* Hero */}
        <div className="rm-hero">
          <div className="rm-hero-inner">
            <div>
              <h1>Akella Krishna Vamshi</h1>
              <p className="rm-hero-sub">Data Science &amp; AI Undergraduate &nbsp;·&nbsp; Hyderabad</p>
            </div>
            <a
              href="/files/Akella Krishna Vamshi Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rm-resume-btn"
            >
              View Resume ↗
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
              <p className="rm-section-title">Featured Projects</p>
              <div className="rm-project-list">
                <a href="https://github.com/1Vamshi0/Data-Tales" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Data Tales <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">Python · JavaScript · Flask</span>
                </a>
                <a href="https://github.com/1Vamshi0/Mock-IPL-Auction" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Mock IPL Auction <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">JavaScript · HTML5 · CSS3</span>
                </a>
                <a href="https://github.com/1Vamshi0/Vamshi-s-Armoury-" target="_blank" rel="noreferrer" className="rm-project-row">
                  <span className="rm-project-name">Vamshi's Armoury <span className="rm-project-link-icon">↗</span></span>
                  <span className="rm-project-stack">In progress</span>
                </a>
              </div>

              <div className="rm-section-gap">
                <p className="rm-section-title">Core Competencies</p>
                <div className="rm-comp-list">
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Languages</span>
                    <span className="rm-comp-value">Python, C, Java, JavaScript</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Tools &amp; Frameworks</span>
                    <span className="rm-comp-value">HTML5, CSS3, MongoDB, REST APIs, Figma, Git, AWS</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Strengths</span>
                    <span className="rm-comp-value">Data Analytics, SEO Analytics, Cloud Deployment, DSA</span>
                  </div>
                  <div className="rm-comp-row">
                    <span className="rm-comp-label">Methodology</span>
                    <span className="rm-comp-value">Agile, Scrum, Version Control</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EXPERIENCE ── */}
          {activeSection === 'internships' && (
            <div>
              <p className="rm-section-title">Internships</p>
              <div className="rm-exp-list">
                <div className="rm-exp-item">
                  <div className="rm-exp-header">
                    <span className="rm-exp-role">Software Development Intern</span>
                    <span className="rm-exp-date">Jan 2026 – Jun 2026</span>
                  </div>
                  <div className="rm-exp-company">AdAnvil</div>
                  <div className="rm-exp-stack">React · Node.js · JavaScript</div>
                </div>
                <div className="rm-exp-item">
                  <div className="rm-exp-header">
                    <span className="rm-exp-role">Digital Marketing Intern</span>
                    <span className="rm-exp-date">Jan 2024 – Mar 2024</span>
                  </div>
                  <div className="rm-exp-company">QiTech</div>
                  <div className="rm-exp-stack">Google Analytics · SEO Tools · WordPress</div>
                </div>
              </div>

              <div className="rm-section-gap">
                <p className="rm-section-title">Campus Leadership</p>
                <div className="rm-exp-list">
                  <div className="rm-exp-item">
                    <div className="rm-exp-header">
                      <span className="rm-exp-role">Vice President</span>
                      <span className="rm-exp-date">Aug 2024 – May 2025</span>
                    </div>
                    <div className="rm-exp-company">ICFAI Tech Entrepreneurship Club</div>
                  </div>
                  <div className="rm-exp-item">
                    <div className="rm-exp-header">
                      <span className="rm-exp-role">Lead Graphic Designer</span>
                      <span className="rm-exp-date">Aug 2023 – May 2024</span>
                    </div>
                    <div className="rm-exp-company">ICFAI Tech Entrepreneurship Club</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {activeSection === 'about' && (
            <div>
              <p className="rm-section-title">About Me</p>
              <p className="rm-bio">
                B.Tech Data Science &amp; AI student at ICFAI Hyderabad and former President of ITEC — a software and design enthusiast who cares as much about the <em>why</em> behind the code as the code itself. I build at the intersection of data, design, and strategy, with a track record of leading teams, shipping projects, and bringing unconventional ideas to life. Whether it's a machine learning pipeline or a product interface, I'm drawn to work that creates real value for real people.
              </p>
              <div className="rm-section-gap">
                <p className="rm-section-title">Soft Skills</p>
                <div className="rm-skill-grid">
                  {[
                    { label: 'Strategic Thinking', desc: 'Connects dots between data, design, and outcomes' },
                    { label: 'Collaborative Builder', desc: 'Thrives in teams; led 50+ member club as President' },
                    { label: 'Creative Problem Solver', desc: 'Drawn to unconventional approaches and first-principles thinking' },
                    { label: 'Adaptable', desc: 'Comfortable across dev, design, marketing, and leadership roles' },
                    { label: 'Proactive', desc: 'Self-driven; pursues projects beyond coursework' },
                    { label: 'Clear Communicator', desc: 'Translates technical ideas into accessible language' },
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
              <p className="rm-section-title">Contact</p>
              <div className="rm-contact-list">
                <a href="mailto:akellakrishnavamshi@gmail.com" className="rm-contact-row">
                  <span className="rm-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span className="rm-contact-platform">Email</span>
                  <span className="rm-contact-value">akellakrishnavamshi@gmail.com</span>
                </a>
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