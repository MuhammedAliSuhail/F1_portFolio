import React from 'react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div class="modal-backdrop active" id="projectModal" onClick={(e) => { if (e.target.id === 'projectModal') onClose(); }}>
      <div class="modal-card" id="modalCard">
        <button class="modal-close-btn" id="modalCloseBtn" onClick={onClose}>&times;</button>
        <div id="modalContent">
          <div class="section-tag cyan">{project.chassisNo} &bull; CODE & SPECS</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>{project.title}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{project.summary}</p>
          
          <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--petronas-teal)', marginBottom: '0.5rem' }}>CHASSIS CODE IMPLEMENTATION</h4>
          <pre style={{
            background: '#06080B',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--speed-cyan)',
            overflowX: 'auto',
            marginBottom: '1.5rem'
          }}><code>{project.codeSnippet}</code></pre>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button class="btn-f1-secondary" id="modalDoneBtn" onClick={onClose}>Close Inspection</button>
          </div>
        </div>
      </div>
    </div>
  );
}
