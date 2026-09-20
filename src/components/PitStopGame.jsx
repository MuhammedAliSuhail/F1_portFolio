import React, { useState, useRef, useEffect } from 'react';
import { playBeep, playLightsOutSound } from '../utils/audioSynth';

export default function PitStopGame({ audioEnabled }) {
  const [gameState, setGameState] = useState('IDLE'); // IDLE, LIGHTS_COUNTING, WAITING_LIGHTS_OUT, READY_TO_CLICK
  const [activeLightsCount, setActiveLightsCount] = useState(0); // 0 to 5
  const [statusText, setStatusText] = useState('Press START to initiate launch sequence');
  const [reactionScore, setReactionScore] = useState('--- ms');
  const [benchmarkTier, setBenchmarkTier] = useState({ text: 'NOT TESTED', color: 'var(--text-muted)' });
  const [btnText, setBtnText] = useState('START LAUNCH SEQUENCE');

  const startTimeRef = useRef(0);
  const countTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (countTimeoutRef.current) clearTimeout(countTimeoutRef.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (gameState === 'IDLE') {
      startLightsSequence();
    } else if (gameState === 'WAITING_LIGHTS_OUT' || gameState === 'LIGHTS_COUNTING') {
      if (countTimeoutRef.current) clearTimeout(countTimeoutRef.current);
      setActiveLightsCount(0);
      setStatusText('FALSE START! JUMPED THE LIGHTS (+ 5s PENALTY)');
      setReactionScore('FALSE');
      setBenchmarkTier({ text: 'JUMPED START', color: 'var(--f1-red)' });
      setBtnText('RETRY LAUNCH');
      setGameState('IDLE');
      playLightsOutSound(audioEnabled);
    } else if (gameState === 'READY_TO_CLICK') {
      const endTime = performance.now();
      const reactionTime = Math.round(endTime - startTimeRef.current);
      playBeep(1200, 0.15, 'sine', audioEnabled);

      setReactionScore(`${reactionTime} ms`);

      let tierText = '';
      let tierColor = '';
      if (reactionTime < 200) {
        tierText = '🏎️ MUHAMMED SUHAIL POLE TIER (< 200MS RHAPSODY!)';
        tierColor = 'var(--speed-cyan)';
      } else if (reactionTime <= 270) {
        tierText = '⚡ HL7 / FHIR FAST LANE LEGEND';
        tierColor = 'var(--sector-green)';
      } else if (reactionTime <= 360) {
        tierText = '🔧 SOLID SPRING BOOT DEVELOPER';
        tierColor = 'var(--drs-amber)';
      } else {
        tierText = '⚠️ ROUTE RETRY REQUIRED';
        tierColor = 'var(--f1-red)';
      }

      setBenchmarkTier({ text: tierText, color: tierColor });
      setStatusText(`TRANSFORMATION TIME: ${reactionTime}ms`);
      setBtnText('GO AGAIN');
      setGameState('IDLE');
    }
  };

  const startLightsSequence = () => {
    setGameState('LIGHTS_COUNTING');
    setActiveLightsCount(0);
    setStatusText('LIGHTS COUNTDOWN INITIATED...');
    setBtnText('WAIT FOR LIGHTS OUT!');

    let currentPair = 0;
    const lightUpNext = () => {
      if (currentPair < 5) {
        currentPair++;
        setActiveLightsCount(currentPair);
        playBeep(500 + currentPair * 100, 0.1, 'sine', audioEnabled);
        countTimeoutRef.current = setTimeout(lightUpNext, 1000);
      } else {
        setGameState('WAITING_LIGHTS_OUT');
        setStatusText('STAY READY... LIGHTS COULD GO OUT AT ANY SECOND!');
        const randomDelay = 1500 + Math.random() * 2500;
        countTimeoutRef.current = setTimeout(lightsOut, randomDelay);
      }
    };
    lightUpNext();
  };

  const lightsOut = () => {
    setActiveLightsCount(0);
    playLightsOutSound(audioEnabled);
    startTimeRef.current = performance.now();
    setGameState('READY_TO_CLICK');
    setStatusText('LIGHTS OUT! CLICK NOW!');
    setBtnText('CLICK NOW!');
  };

  return (
    <section id="pitstop" class="pitstop-section">
      <div class="container">
        <div class="pitstop-card">
          <div class="section-tag amber" style={{ margin: '0 auto 1.5rem auto' }}>
            <i class="fa-solid fa-stopwatch"></i> Reaction Time & Data Transformation Benchmark
          </div>
          
          <h2 class="section-title">5 Red Lights Out Launch Game</h2>
          <p class="section-subtitle" style={{ margin: '0 auto 2rem auto' }}>
            Test your reaction speed when all 5 red lights go out! Can you match the sub-millisecond conversion speed of Muhammed Suhail's Rhapsody & Spring routes?
          </p>

          {/* 5 F1 Lights */}
          <div class="f1-lights-grid" id="lightsGrid">
            {[1, 2, 3, 4, 5].map((idx) => {
              const isOn = activeLightsCount >= idx;
              return (
                <div key={idx} class="light-box">
                  <div class={`light-bulb ${isOn ? 'on' : ''}`}></div>
                  <div class={`light-bulb ${isOn ? 'on' : ''}`}></div>
                </div>
              );
            })}
          </div>

          <div class="pitstop-status-text" id="pitStatusText">{statusText}</div>

          <div class="reaction-score-board">
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>YOUR REACTION TIME</div>
              <div class="reaction-time-num" id="reactionScore">{reactionScore}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>INTEGRATION BENCHMARK TIER</div>
              <div id="benchmarkTier" style={{ fontWeight: 700, color: benchmarkTier.color }}>
                {benchmarkTier.text}
              </div>
            </div>
          </div>

          <button id="startLightsBtn" class="btn-f1-primary" style={{ margin: '0 auto' }} onClick={handleButtonClick}>
            <i class="fa-solid fa-play"></i> {btnText}
          </button>
        </div>
      </div>
    </section>
  );
}
