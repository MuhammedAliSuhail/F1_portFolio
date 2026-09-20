import React, { useState } from 'react';

export default function Hero() {
  const [activeVisual, setActiveVisual] = useState('photo'); // 'photo' or 'pitwall'

  return (
    <section id="cockpit" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-text-content">
          <div className="hero-driver-badge">
            <span className="car-num" style={{ background: 'var(--petronas-teal)', color: '#07090E' }}>#44</span>
            <span>DRIVER: MUHAMMED SUHAIL &bull; MERCEDES-AMG PETRONAS INTEGRATION ENGINEER</span>
          </div>
          
          <h1 className="hero-title">
            Healthcare & Enterprise <span className="text-gradient-teal">Data Pipelines</span> at <span className="text-gradient-silver">Silver Arrow Speed</span>.
          </h1>
          
          <p className="hero-bio">
            Integration Developer specializing in <strong>Orion Rhapsody Integration Engine</strong>, <strong>HL7 v2/v3</strong>, <strong>FHIR STU3/R4</strong>, and <strong>Java & Spring Boot</strong> microservices. Passionate Mercedes-AMG PETRONAS F1 team enthusiast with <strong>600+ DSA problems solved</strong> for Brackley-grade algorithmic precision.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-f1-primary">
              <i className="fa-solid fa-gauge-high"></i> Inspect Integration Chassis
            </a>
            <a href="#pitstop" className="btn-f1-secondary">
              <i className="fa-solid fa-stopwatch"></i> Benchmark Transformation Latency
            </a>
          </div>

          <div className="hero-quick-stats">
            <div className="stat-item">
              <div className="stat-value"><span>600+</span></div>
              <div className="stat-label">DSA Problems Solved</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt; <span>1.2</span>ms</div>
              <div className="stat-label">HL7 ➔ FHIR Conversion</div>
            </div>
            <div className="stat-item">
              <div className="stat-value"><span>99.999%</span></div>
              <div className="stat-label">Rhapsody Route Uptime</div>
            </div>
          </div>
        </div>

        <div className="hero-visual-card glow-box-cyan">
          {/* Visual Switcher Controls */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            background: 'rgba(7, 9, 14, 0.85)',
            borderBottom: '1px solid var(--border-subtle)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--petronas-teal)', fontWeight: 700 }}>
              <i className="fa-solid fa-id-card"></i> BRACKLEY DRIVER CARD
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setActiveVisual('photo')} 
                className={`btn-icon ${activeVisual === 'photo' ? 'active' : ''}`}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  background: activeVisual === 'photo' ? 'var(--petronas-teal)' : 'transparent',
                  color: activeVisual === 'photo' ? '#07090E' : 'var(--text-dim)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '1px solid var(--petronas-teal)'
                }}
              >
                <i className="fa-solid fa-user-gear"></i> Photo
              </button>
              <button 
                onClick={() => setActiveVisual('pitwall')} 
                className={`btn-icon ${activeVisual === 'pitwall' ? 'active' : ''}`}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  background: activeVisual === 'pitwall' ? 'var(--petronas-teal)' : 'transparent',
                  color: activeVisual === 'pitwall' ? '#07090E' : 'var(--text-dim)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '1px solid var(--petronas-teal)'
                }}
              >
                <i className="fa-solid fa-desktop"></i> Pit Wall
              </button>
            </div>
          </div>

          <div className="visual-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
            {activeVisual === 'photo' ? (
              <div style={{ position: 'relative', textAlign: 'center', padding: '1rem', background: '#090C12' }}>
                <img 
                  src="/assets/suhail_photo.jpg" 
                  alt="Muhammed Suhail - Mercedes-AMG PETRONAS Integration Engineer" 
                  style={{
                    maxHeight: '380px',
                    width: 'auto',
                    margin: '0 auto',
                    borderRadius: '12px',
                    border: '2px solid var(--petronas-teal)',
                    boxShadow: '0 0 25px rgba(0, 210, 190, 0.4)',
                    objectFit: 'cover'
                  }} 
                />
                <div style={{
                  marginTop: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#FFFFFF'
                }}>
                  MUHAMMED SUHAIL
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--petronas-teal)',
                  letterSpacing: '1px'
                }}>
                  MERCEDES-AMG PETRONAS INTEGRATION ENGINEER
                </div>
              </div>
            ) : (
              <img 
                src="/assets/hero.png" 
                alt="Muhammed Suhail Mercedes-AMG PETRONAS Integration Pit-Wall Dashboard" 
                id="heroVisualImage" 
              />
            )}
          </div>
          <div className="telemetry-overlay-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-notes-medical" style={{ color: 'var(--petronas-teal)' }}></i>
              <span>ENGINE: MERCEDES W15 / RHAPSODY / HL7 / FHIR / JAVA</span>
            </div>
            <span style={{ color: 'var(--drs-amber)', fontWeight: 700 }}>600+ DSA BOOST</span>
          </div>
        </div>
      </div>
    </section>
  );
}
