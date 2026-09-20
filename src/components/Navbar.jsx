import React from 'react';
import { playBeep } from '../utils/audioSynth';

export default function Navbar({ audioEnabled, setAudioEnabled }) {
  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    if (nextState) {
      playBeep(800, 0.1, 'sine', true);
    }
  };

  return (
    <nav class="pit-navbar">
      <div class="container nav-inner">
        <a href="#cockpit" class="brand-logo">
          <div class="logo-flag">
            <span></span><span></span><span></span>
          </div>
          <span>SUHAIL<span style={{ color: 'var(--petronas-teal)' }}>.PETRONAS_AMGF1</span></span>
        </a>
        
        <ul class="nav-links">
          <li><a href="#telemetry"><i class="fa-solid fa-chart-line"></i> Telemetry HUD</a></li>
          <li><a href="#garage"><i class="fa-solid fa-gear"></i> Integration Garage</a></li>
          <li><a href="#circuit"><i class="fa-solid fa-route"></i> Career Circuit</a></li>
          <li><a href="#projects"><i class="fa-solid fa-flag-checkered"></i> Race Chassis</a></li>
          <li><a href="#pitstop"><i class="fa-solid fa-stopwatch"></i> Reaction Test</a></li>
          <li><a href="#terminal"><i class="fa-solid fa-terminal"></i> CLI Terminal</a></li>
        </ul>

        <div class="nav-hud-controls">
          <div class="hud-badge">
            <span class="hud-pulse"></span>
            <span>BRACKLEY PIPELINE: 99.999% ONLINE</span>
          </div>
          <button 
            id="audioToggle" 
            class="btn-icon" 
            title="Toggle Radio Sound Effects" 
            aria-label="Toggle Sound"
            onClick={toggleAudio}
            style={{ color: audioEnabled ? 'var(--f1-red)' : 'var(--text-dim)' }}
          >
            <i class={`fa-solid ${audioEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`} id="audioIcon"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
