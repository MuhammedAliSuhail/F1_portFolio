import React, { useEffect, useRef, useState } from 'react';

export default function TelemetryHUD() {
  const canvasRef = useRef(null);
  const [timestamp, setTimestamp] = useState('00:00:00 UTC | HL7 LATENCY: 1.40ms');
  const [rpmVal, setRpmVal] = useState('14,200 MSG/MIN');
  const [rpmPct, setRpmPct] = useState(86);
  const [cacheVal, setCacheVal] = useState('99.8%');
  const [cachePct, setCachePct] = useState(99.8);

  // Real-time Canvas Telemetry Stream
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dataPoints = [];
    const maxPoints = 50;
    for (let i = 0; i < maxPoints; i++) {
      dataPoints.push(1.4 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.25);
    }

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridYStep = canvas.height / 4;
      for (let y = gridYStep; y < canvas.height; y += gridYStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      dataPoints.shift();
      const lastVal = dataPoints[dataPoints.length - 1];
      const nextVal = Math.max(0.8, Math.min(3.2, lastVal + (Math.random() - 0.49) * 0.3));
      dataPoints.push(nextVal);

      const stepX = canvas.width / (maxPoints - 1);

      // Gradient Fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 210, 190, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 210, 190, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, canvas.height - (dataPoints[0] / 4) * canvas.height);
      for (let i = 1; i < dataPoints.length; i++) {
        const x = i * stepX;
        const y = canvas.height - (dataPoints[i] / 4) * canvas.height;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line Stroke
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - (dataPoints[0] / 4) * canvas.height);
      for (let i = 1; i < dataPoints.length; i++) {
        const x = i * stepX;
        const y = canvas.height - (dataPoints[i] / 4) * canvas.height;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#00D2BE';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Current Tip Pulse Dot
      const currentX = canvas.width;
      const currentY = canvas.height - (nextVal / 4) * canvas.height;
      ctx.beginPath();
      ctx.arc(currentX - 4, currentY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#CCFF00';
      ctx.fill();

      const now = new Date();
      const timeStr = now.toISOString().substring(11, 19) + ' UTC';
      setTimestamp(`${timeStr} | HL7 LATENCY: ${nextVal.toFixed(2)}ms`);
    }, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Gauge Tickers
  useEffect(() => {
    const gaugeInterval = setInterval(() => {
      const rpm = Math.floor(13900 + Math.random() * 850);
      const rpmP = ((rpm / 15000) * 100).toFixed(1);
      setRpmVal(`${rpm.toLocaleString()} MSG/MIN`);
      setRpmPct(rpmP);

      const cacheP = (99.4 + Math.random() * 0.5).toFixed(1);
      setCacheVal(`${cacheP}%`);
      setCachePct(cacheP);
    }, 1200);

    return () => clearInterval(gaugeInterval);
  }, []);

  return (
    <section id="telemetry" class="telemetry-section">
      <div class="container">
        <div class="section-tag cyan">
          <i class="fa-solid fa-satellite-dish"></i> Live Integration Stream
        </div>
        <h2 class="section-title">Integration Telemetry Dashboard</h2>
        <p class="section-subtitle">Real-time pipeline metrics, HL7/FHIR message transformation jitter, and algorithmic throughput monitoring.</p>

        <div class="hud-grid">
          {/* Live Graph */}
          <div class="hud-card glow-box-cyan">
            <div class="hud-card-header">
              <div class="hud-card-title">
                <i class="fa-solid fa-chart-line" style={{ color: 'var(--speed-cyan)' }}></i>
                HL7 ➔ FHIR Message Processing Latency (ms)
              </div>
              <span class="mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }} id="liveTimestamp">{timestamp}</span>
            </div>
            <div class="canvas-container">
              <canvas ref={canvasRef} id="latencyChart"></canvas>
            </div>
          </div>

          {/* Gauge Metrics Side Panel */}
          <div class="gauge-metrics">
            <div class="gauge-item">
              <div class="gauge-label-row">
                <span><i class="fa-solid fa-tachometer-alt" style={{ color: 'var(--f1-red)' }}></i> RHAPSODY ROUTE LOAD</span>
                <span id="rpmVal" style={{ color: 'var(--f1-red)', fontWeight: 700 }}>{rpmVal}</span>
              </div>
              <div class="gauge-bar-track">
                <div class="gauge-bar-fill red" id="rpmBar" style={{ width: `${rpmPct}%` }}></div>
              </div>
            </div>

            <div class="gauge-item">
              <div class="gauge-label-row">
                <span><i class="fa-solid fa-bolt" style={{ color: 'var(--speed-cyan)' }}></i> FHIR VALIDATION SUCCESS</span>
                <span id="cacheVal" style={{ color: 'var(--speed-cyan)', fontWeight: 700 }}>{cacheVal}</span>
              </div>
              <div class="gauge-bar-track">
                <div class="gauge-bar-fill cyan" id="cacheBar" style={{ width: `${cachePct}%` }}></div>
              </div>
            </div>

            <div class="gauge-item">
              <div class="gauge-label-row">
                <span><i class="fa-solid fa-brain" style={{ color: 'var(--drs-amber)' }}></i> ALGORITHMIC DSA COMPLEXITY</span>
                <span style={{ color: 'var(--drs-amber)', fontWeight: 700 }}>O(log N) OPTIMAL</span>
              </div>
              <div class="gauge-bar-track">
                <div class="gauge-bar-fill amber" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
