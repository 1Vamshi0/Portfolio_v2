import React, { useState } from 'react';

function RecruiterMode({ onBackToHome }) {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="recruiter-mode">
      <section className='Header-v2'>
        Time Crunch Mode
      </section>
      {/* Back to Home Button */}
      <button className="back-btn-time" onClick={onBackToHome}>
        Change Mode
      </button>

      {/* HEADER - ALWAYS VISIBLE */}
      <header>
        <h1>Akella Krishna Vamshi</h1>
      </header>

      {/* NAVIGATION BUTTONS - ALWAYS VISIBLE */}
      <section className="quick-links">
        <button onClick={() => setActiveSection('about')} className="btn-secondary">About Me</button>
        <button onClick={() => setActiveSection('projects')} className="btn-secondary">Projects</button>
        <button onClick={() => setActiveSection('internships')} className="btn-secondary">Experience</button>
        <button onClick={() => setActiveSection('contact')} className="btn-secondary">Contact Me</button>
        <a href="/files/Akella Krishna Vamshi Resume.pdf" target='_blank' className="btn-primary">View Resume</a>

      </section>

      {/* ABOUT & SKILLS SECTION */}
      {activeSection === 'about' && (
        <section className="about">
          <h2>About Me</h2>
          <p>
          Detail-oriented and results-driven Data Science and Artificial Intelligence undergraduate with 3+ years of coding experience through academic and self-driven projects using Python, SQL, and machine learning frameworks. Completed a 2-month internship as an SEO Analyst at QI Media, gaining practical exposure to digital marketing analytics. Collaborative and passionate about using data to build innovative, real-world solutions.
          </p>
          <br></br><br></br>
          <h2>Soft Skills</h2>
          <div className="skill-tags">
            <span>Analytical</span>
            <span>Creative</span>
            <span>Collaborative</span>
            <span>Adaptable</span>
            <span>Proactive</span>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION */}
      {activeSection === 'projects' && (
        <section className="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            <a href="https://github.com/1Vamshi0/Data-Tales" target='_blank' className="project-card">
              <h3>Data Tales 🔗</h3>
              <p>Python, JavaScript, Flask</p>
            </a>
            <a href="https://github.com/1Vamshi0/Mock-IPL-Auction" target='_blank' className="project-card">
              <h3>Mock IPL Auction 🔗</h3>
              <p>JavaScript, HTML5, CSS3</p>
            </a>
            <a href="https://github.com/1Vamshi0/Vamshi-s-Armoury-" target='_blank' className="project-card">
              <h3>Vamshi's Armoury 🔗</h3>
              <p>In progress</p>
            </a>
          </div>
          <h2>Core Competencies</h2>
          <div className="competencies-section">
            <div className="competency-item">
              <h4>Programming Languages</h4>
              <span>Python, C, Java, JavaScript</span>
            </div>
            <div className="competency-item">
              <h4>Tools & Frameworks</h4>
              <span>HTML5, CSS3, MongoDB, REST APIs, Figma, Git, AWS</span>
            </div>
            <div className="competency-item">
              <h4>Technical Strengths</h4>
              <span>Data Analytics, SEO Analytics, Cloud Deployment, Data Structures & Algorithms</span>
            </div>
            <div className="competency-item">
              <h4>Methodologies</h4>
              <span>Agile, Scrum, Version Control</span>
            </div>
          </div>

        </section>
      )}

      {/* INTERNSHIPS SECTION */}
      {activeSection === 'internships' && (
        <section className="projects">
          <h2>Featured Internships</h2>
          <div className="project-grid">
            <div className="project-card">
            <h3>Software Devlopment Intern - AdAnvil</h3>
            <p>January 2026 - June 2026</p><br></br>
            <p>React, Node.js, JavaScript</p>
            </div>
            <div className="project-card">
              <h3>Digital Marketing Intern - QiTech</h3>
              <p>January 2024 - March 2024</p><br></br>
              <p>Google Analytics, SEO Tools, Wordpress</p>
            </div>
          </div>
          <h2>Campus Leadership</h2>
          <div className="internship-card">
            <h3>Vice President , ICFAI Tech Entrepreneurship Club</h3>
            <p>August 2024 - May 2025</p>
            <br></br>
            <h3>Lead Graphic Designer - ICFAI Tech Entrepreneurship Club</h3>
            <p>August 2023 - May 2024</p>
            <br></br>
          </div>
        </section>

        
      )}

      {/* CONTACT SECTION */}
      {activeSection === 'contact' && (
        <section className="contact">
          <h2>Contact Me</h2>
         <div className="contact-grid">
            <a href="mailto:akellakrishnavamshi@gmail.com" className="contact-card">
              <p>Email</p>
              <h3>akellakrishnavamshi@gmail.com</h3>
            </a>
            
            <a href="https://www.linkedin.com/in/akella-krishna-vamshi/" target="_blank" className="contact-card">
              <p>LinkedIn</p>
              <h3>Visit Profile</h3>
            </a>
            <a href="https://github.com/1Vamshi0?tab=repositories" target="_blank" className="contact-card">
              <p>GitHub</p>
              <h3>View Repositories</h3>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

export default RecruiterMode;