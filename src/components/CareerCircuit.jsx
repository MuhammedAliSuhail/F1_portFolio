import React, { useState } from 'react';
import { playBeep } from '../utils/audioSynth';

const careerSectors = {
  1: {
    sectorName: 'SECTOR 1: BRACKLEY GRAND PRIX OF HEALTHCARE INTEGRATION',
    period: 'SPECIALIZATION ERA',
    role: 'Integration Engineer (Rhapsody, HL7 & FHIR Specialist)',
    bullets: [
      'Engineered high-reliability healthcare integration routes using Orion Rhapsody Integration Engine with Silver Arrow speed.',
      'Designed seamless message mapping filters converting legacy HL7 v2 messages (ADT, ORU, ORM) to FHIR R4 JSON resources.',
      'Maintained 99.999% uptime for critical hospital data channels over MLLP and HTTP protocols.'
    ]
  },
  2: {
    sectorName: 'SECTOR 2: SILVER ARROWS BACKEND & MICROSERVICES CIRCUIT',
    period: 'SOFTWARE DEVELOPMENT',
    role: 'Software Developer (Java 21 & Spring Boot 3 Architect)',
    bullets: [
      'Built scalable RESTful microservices and backend API gateways using Java 21 and Spring Boot 3.',
      'Integrated PostgreSQL database layer with Hibernate/JPA for efficient query execution.',
      'Implemented secure JWT authentication and role-based access control (RBAC) across enterprise services.'
    ]
  },
  3: {
    sectorName: 'SECTOR 3: BRACKLEY ALGORITHMIC MASTERY & DSA POLE POSITION',
    period: '600+ DSA PROBLEMS SOLVED',
    role: 'Algorithmic Problem Solver & Software Engineer',
    bullets: [
      'Solved 600+ Data Structures & Algorithms problems covering Trees, Graphs, Dynamic Programming, Heap, and Sorting.',
      'Consistently optimized code complexity from O(N²) down to O(N log N) / O(1) for high-performance data processing.',
      'Applied advanced data structures to optimize integration engine message queues and in-memory caches.'
    ]
  }
};

export default function CareerCircuit({ audioEnabled }) {
  const [activeSector, setActiveSector] = useState(1);

  const handleSectorClick = (sectorId) => {
    setActiveSector(sectorId);
    playBeep(900, 0.08, 'sine', audioEnabled);
  };

  const currentSector = careerSectors[activeSector];

  return (
    <section id="circuit" class="circuit-section">
      <div class="container">
        <div class="section-tag">
          <i class="fa-solid fa-road"></i> Career Track Milestones
        </div>
        <h2 class="section-title">Integration & Engineering Circuit</h2>
        <p class="section-subtitle">Navigate through the track sectors representing Muhammed Suhail's key achievements in Healthcare Integration & Backend Development.</p>

        <div class="circuit-wrapper">
          {/* Interactive Circuit SVG */}
          <div class="circuit-svg-container">
            <svg viewBox="0 0 600 400" class="circuit-track-svg" id="circuitTrackSvg">
              {/* Sector 1 Path (Red) */}
              <path 
                id="sector1-path" 
                class={`sector-path ${activeSector === 1 ? 'active' : ''}`} 
                onClick={() => handleSectorClick(1)}
                d="M 80 320 C 50 200, 100 80, 220 70 C 300 65, 340 120, 360 160" 
              />
              {/* Sector 2 Path (Cyan) */}
              <path 
                id="sector2-path" 
                class={`sector-path ${activeSector === 2 ? 'active' : ''}`} 
                onClick={() => handleSectorClick(2)}
                d="M 360 160 C 400 220, 520 200, 530 290 C 540 350, 420 360, 320 330" 
              />
              {/* Sector 3 Path (Amber) */}
              <path 
                id="sector3-path" 
                class={`sector-path ${activeSector === 3 ? 'active' : ''}`} 
                onClick={() => handleSectorClick(3)}
                d="M 320 330 C 220 300, 160 370, 80 320" 
              />

              {/* Checkpoint Dots */}
              <circle cx="80" cy="320" r="10" fill="#00D2BE" />
              <text x="50" y="345" fill="#FFF" fontSize="12" fontWeight="bold">START / FINISH</text>

              <circle cx="360" cy="160" r="10" fill="#E2E8F0" />
              <text x="375" y="155" fill="#E2E8F0" fontSize="12" fontWeight="bold">S1 ➔ S2</text>

              <circle cx="320" cy="330" r="10" fill="#CCFF00" />
              <text x="310" y="360" fill="#CCFF00" fontSize="12" fontWeight="bold">S2 ➔ S3</text>
            </svg>
          </div>

          {/* Sector Details Box */}
          <div class="sector-details-panel" id="sectorDetailsPanel">
            <div class="sector-card" data-sector={activeSector}>
              <div class="sector-card-header">
                <span class="sector-name" style={{ color: 'var(--petronas-teal)' }}>{currentSector.sectorName}</span>
                <span class="sector-period">{currentSector.period}</span>
              </div>
              <div class="sector-role">{currentSector.role}</div>
              <ul class="sector-bullets">
                {currentSector.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
