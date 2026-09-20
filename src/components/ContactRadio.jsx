import React, { useState } from 'react';
import { playLightsOutSound } from '../utils/audioSynth';

export default function ContactRadio({ audioEnabled }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    playLightsOutSound(audioEnabled);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-tag">
          <i class="fa-solid fa-walkie-talkie"></i> Team Radio Transmission
        </div>

        <div class="contact-grid">
          <div>
            <h2 class="section-title">Initiate Team Radio</h2>
            <p class="section-subtitle">Looking for an Integration Developer, Rhapsody Specialist, or Senior Software Developer with strong Java & DSA expertise? Transmit a message to Muhammed Suhail.</p>

            <div class="team-radio-box glow-box-red" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span class="mono" style={{ fontSize: '0.8rem', color: 'var(--f1-red)', fontWeight: 700 }}>RADIO FREQUENCY: 108.4 MHz</span>
                <span class="mono" style={{ fontSize: '0.75rem', color: 'var(--sector-green)' }}>SIGNAL: EXCELLENT</span>
              </div>

              <div class="radio-wave-visualizer">
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
              </div>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                "Copy driver Muhammed Suhail. Radio frequency open for Integration, Rhapsody, Java & Spring Boot opportunities."
              </p>
            </div>
          </div>

          <form class="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div class="form-group">
              <label class="form-label" htmlFor="contactName">Team / Recruiter Name</label>
              <input 
                type="text" 
                id="contactName" 
                class="form-input" 
                placeholder="e.g. Healthcare Team Lead / Hiring Principal" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div class="form-group">
              <label class="form-label" htmlFor="contactEmail">Radio Frequency (Email)</label>
              <input 
                type="email" 
                id="contactEmail" 
                class="form-input" 
                placeholder="e.g. suhail.contact@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div class="form-group">
              <label class="form-label" htmlFor="contactMessage">Radio Transmission Message</label>
              <textarea 
                id="contactMessage" 
                class="form-textarea" 
                placeholder="Describe the integration requirements, HL7/FHIR pipeline needs, or software development role..." 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" class="btn-f1-primary">
              <i class="fa-solid fa-paper-plane"></i> TRANSMIT RADIO MESSAGE
            </button>
            
            {submitted && (
              <div id="formSuccessMessage" style={{ display: 'block', fontFamily: 'var(--font-mono)', color: 'var(--speed-cyan)', fontSize: '0.9rem', marginTop: '1rem' }}>
                <i class="fa-solid fa-check-circle"></i> Radio message acknowledged: "Copy Muhammed! Message received."
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
