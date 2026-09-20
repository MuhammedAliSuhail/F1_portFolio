import React, { useState, useRef, useEffect } from 'react';
import { playBeep } from '../utils/audioSynth';

const commands = {
  help: () => `Available Pit Commands:
 - <span style="color:var(--petronas-teal);">mercedes</span>  : Inspect Mercedes-AMG PETRONAS F1 team spec & W15 telemetry
 - <span style="color:#FFF;">skills</span>    : Display Muhammed Suhail's core tech compounds
 - <span style="color:#FFF;">dsa</span>       : Inspect 600+ Data Structures & Algorithms stats
 - <span style="color:#FFF;">hl7</span>       : View HL7 v2/v3 message mapping standards
 - <span style="color:#FFF;">fhir</span>      : View FHIR R4 resource transformation stats
 - <span style="color:#FFF;">projects</span>  : Show integration chassis & backend projects
 - <span style="color:#FFF;">fastest-lap</span>: Display engineer's fastest data transformation benchmark
 - <span style="color:#FFF;">contact</span>   : Print radio contact details
 - <span style="color:#FFF;">clear</span>     : Clear terminal screen`,
  mercedes: () => `🏎️ MERCEDES-AMG PETRONAS F1 INTEGRATION SPEC:
 &bull; Team & Garage : Mercedes-AMG PETRONAS F1 Team Fan & Integration Engineer
 &bull; Chassis / Engine: W15 E Performance / Orion Rhapsody v6.8 & Java 21
 &bull; Driver Designation: Muhammed Suhail (#44 / #10)
 &bull; Algorithmic Boost : 600+ Solved Data Structures & Algorithms Problems
 &bull; Pipeline Uptime   : 99.999% Reliability Record`,
  w15: () => `⚡ MERCEDES W15 TELEMETRY:
 Acceleration: 0-100 km/h in sub-millisecond HL7 parsing
 Top Speed   : 15,000 Messages / Min in Rhapsody Engine
 Fuel        : Java 21 Virtual Threads & Spring Boot 3 Microservices`,
  skills: () => `MUHAMMED SUHAIL'S TECH COMPOUNDS:
 [INTEGRATION] Orion Rhapsody Integration Engine, HL7 v2/v3, FHIR STU3/R4
 [BACKEND]     Java 21, Spring Boot 3, REST APIs, Microservices
 [ALGORITHMS]  600+ DSA Problems Solved (Trees, Graphs, DP, Arrays)
 [DATABASE]    PostgreSQL, Redis, Apache Kafka`,
  dsa: () => `📊 ALGORITHMIC PERFORMANCE:
 &bull; Total Problems Solved: 600+
 &bull; Primary Languages    : Java / C++
 &bull; Key Focus Areas     : Graphs (Dijkstra, BFS/DFS), Trees, DP, Heaps
 &bull; Optimization Level  : O(1) space & O(log N) runtime optimal`,
  hl7: () => `🏥 HL7 MAPPING TELEMETRY:
 &bull; Supported Messages  : ADT (A01/A04/A08), ORM (O01), ORU (R01)
 &bull; Processing Latency : < 1.2ms per message
 &bull; Network Protocol    : MLLP (Minimal Lower Layer Protocol)`,
  fhir: () => `🔥 FHIR INTEROPERABILITY:
 &bull; Target Specification: FHIR Release 4 (R4)
 &bull; Core Resources     : Patient, Encounter, Observation, DiagnosticReport
 &bull; Transformation Engine: Rhapsody JS Filters & Spring Boot HAPI FHIR`,
  projects: () => `CHASSIS REGISTER:
 1. Rhapsody HL7-to-FHIR Bridge Engine (Rhapsody / JS)
 2. MediConnect Microservice (Java 21 / Spring Boot 3)
 3. AlgoGrid 600+ DSA Engine (Java / Data Structures)`,
  'fastest-lap': () => `🏎️ BRACKLEY FASTEST TRANSFORM RECORD:
 Track: Rhapsody MLLP Engine
 HL7 ➔ FHIR Conversion: 0.85ms
 Reliability: 99.999% Zero Data Loss`,
  contact: () => `TEAM RADIO CONTACT:
 Name         : Muhammed Suhail
 Role         : Mercedes-AMG PETRONAS Integration Engineer
 Specialization: Rhapsody | HL7 | FHIR | Java | Spring Boot | 600+ DSA`,
  sudo: () => `<span style="color:var(--petronas-teal);">Permission Denied: Only Muhammed Suhail holds root access to Brackley integration routes.</span>`
};

export default function TerminalCLI({ audioEnabled }) {
  const [history, setHistory] = useState([
    { type: 'line', content: 'Welcome to Muhammed Suhail Integration Shell v2.5.0' },
    { type: 'line', content: 'Type <span style="color:#FFF; font-weight:bold;">\'help\'</span> to view available pit commands.' },
    { type: 'line', content: '-----------------------------------------------------', style: { color: 'var(--text-dim)' } }
  ]);
  const [inputValue, setInputValue] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmdText = inputValue.trim().toLowerCase();
      setInputValue('');
      if (!cmdText) return;

      playBeep(900, 0.04, 'sine', audioEnabled);

      if (cmdText === 'clear') {
        setHistory([]);
        return;
      }

      const promptItem = {
        type: 'prompt',
        command: cmdText
      };

      let responseContent = '';
      if (commands[cmdText]) {
        responseContent = typeof commands[cmdText] === 'function' ? commands[cmdText]() : commands[cmdText];
      } else {
        responseContent = `<span style="color:var(--ineos-red);">Command not found: '${escapeHtml(cmdText)}'. Type 'help' for command list.</span>`;
      }

      const responseItem = {
        type: 'response',
        content: responseContent
      };

      setHistory((prev) => [...prev, promptItem, responseItem]);
    }
  };

  const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return (
    <section id="terminal" class="terminal-section">
      <div class="container">
        <div class="section-tag cyan">
          <i class="fa-solid fa-terminal"></i> Command Line Interface
        </div>
        <h2 class="section-title">Pit Wall CLI Terminal</h2>
        <p class="section-subtitle">Execute pit commands directly to query Suhail's skills, DSA stats, HL7/FHIR routes, or run benchmarks.</p>

        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot dot-red"></span>
              <span class="terminal-dot dot-yellow"></span>
              <span class="terminal-dot dot-green"></span>
            </div>
            <div class="terminal-title">suhail@pit-wall-v2.5 ~ (zsh)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>TYPE 'help' FOR COMMANDS</div>
          </div>

          <div class="terminal-body" id="terminalBody" ref={bodyRef}>
            {history.map((item, idx) => {
              if (item.type === 'prompt') {
                return (
                  <div key={idx} class="terminal-line">
                    <span class="terminal-prompt" style={{ color: 'var(--petronas-teal)' }}>suhail@brackley-pit-wall:$</span>{' '}
                    <span>{item.command}</span>
                  </div>
                );
              }
              return (
                <div 
                  key={idx} 
                  class="terminal-line" 
                  style={item.style || { color: 'var(--text-main)' }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              );
            })}
          </div>

          <div style={{ padding: '0.8rem 1.5rem', background: '#0A0D14', borderTop: '1px solid var(--border-subtle)' }}>
            <div class="terminal-input-row">
              <span class="terminal-prompt">suhail@pit-wall:$</span>
              <input 
                type="text" 
                id="terminalInput" 
                class="terminal-input" 
                placeholder="type command (e.g. help, skills, dsa, hl7, fhir, projects)..." 
                autoComplete="off" 
                spellCheck="false"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
