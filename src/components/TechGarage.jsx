import React, { useState } from 'react';
import { playBeep } from '../utils/audioSynth';

const techSkillsData = [
  { name: 'Rhapsody Integration Engine', compound: 'soft', category: 'Healthcare Engine', desc: 'Designing complex communication points, JavaScript filters, MLLP & HTTP connectors.', metrics: { throughput: '15,000 MSG/MIN', reliability: '99.999%', standard: 'HL7 v2/v3' } },
  { name: 'HL7 (v2.x / v3)', compound: 'soft', category: 'Healthcare Standard', desc: 'Parsing & mapping ADT (Admit/Transfer), ORM (Orders), ORU (Observation Results) segments.', metrics: { parsingSpeed: '< 0.8ms', validation: 'Strict Schema', compliance: 'HIPAA' } },
  { name: 'FHIR (STU3 / R4)', compound: 'soft', category: 'Modern Interoperability', desc: 'RESTful FHIR JSON APIs, Patient/Encounter/Observation resource modeling & Bundle batching.', metrics: { format: 'JSON / XML', APIStyle: 'RESTful', interoperability: '100%' } },
  { name: 'Java 21 / 17', compound: 'medium', category: 'Core Backend Language', desc: 'Object-Oriented Design, Multithreading, Streams API, Memory Optimization, Collections Framework.', metrics: { version: 'Java 21', concurrency: 'Virtual Threads', paradigm: 'OOP & Functional' } },
  { name: 'Spring Boot 3', compound: 'medium', category: 'Microservices Framework', desc: 'Spring MVC, Spring Data JPA, Security JWT, Spring Integration pipelines, REST controllers.', metrics: { startup: '1.4s', architecture: 'Microservices', ORM: 'Hibernate' } },
  { name: '600+ DSA Problems Solved', compound: 'hard', category: 'Algorithmic Mastery', desc: 'Proven mastery over Trees, Graphs, Dynamic Programming, Arrays, Hash Tables, Heaps & Sorting.', metrics: { count: '600+ Solved', complexity: 'O(1) / O(log N)', platform: 'LeetCode / GFG' } },
  { name: 'PostgreSQL & SQL', compound: 'hard', category: 'Relational Database', desc: 'Database schema design, query optimization, indexing strategies, JPA entities mapping.', metrics: { ACID: 'Strict', latency: '< 2.0ms', joins: 'Optimized' } },
  { name: 'Apache Kafka & Redis', compound: 'hard', category: 'Streaming & Caching', desc: 'Event-driven pub/sub queues for hospital data pipelines and in-memory caching layers.', metrics: { latency: '< 1.0ms', pubsub: 'Realtime', hitRate: '99.5%' } },
  { name: 'Docker & Microservices', compound: 'wet', category: 'Containerization', desc: 'Building containerized integration routes and backend microservices with Docker Compose.', metrics: { container: 'Alpine / Scratch', deployment: 'Automated', portability: 'High' } },
  { name: 'REST & gRPC APIs', compound: 'wet', category: 'API Interfaces', desc: 'Designing secure, high-throughput RESTful endpoints and gRPC proto interfaces.', metrics: { protocol: 'HTTP/2 & MLLP', serialization: 'Protobuf / JSON', security: 'OAuth2 / JWT' } }
];

export default function TechGarage({ audioEnabled }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleTabClick = (compound) => {
    setActiveFilter(compound);
    playBeep(700, 0.05, 'sine', audioEnabled);
  };

  const filteredSkills = activeFilter === 'all' 
    ? techSkillsData 
    : techSkillsData.filter(s => s.compound === activeFilter);

  return (
    <section id="garage" class="garage-section">
      <div class="container">
        <div class="section-tag amber">
          <i class="fa-solid fa-warehouse"></i> Integration & Software Compounds
        </div>
        <h2 class="section-title">Muhammed Suhail's Tech Garage</h2>
        <p class="section-subtitle">Software compounds selected for high-speed healthcare message routing, microservices, and DSA performance.</p>

        {/* Tyre Selector Tabs */}
        <div class="tyre-selector-tabs">
          <button 
            class={`tyre-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            <div class="tyre-dot" style={{ background: '#FFF' }}></div> All Engineering Components
          </button>
          <button 
            class={`tyre-tab ${activeFilter === 'soft' ? 'active' : ''}`}
            onClick={() => handleTabClick('soft')}
          >
            <div class="tyre-dot"></div> Soft Compound (Healthcare Integration / Rhapsody, HL7, FHIR)
          </button>
          <button 
            class={`tyre-tab ${activeFilter === 'medium' ? 'active' : ''}`}
            onClick={() => handleTabClick('medium')}
          >
            <div class="tyre-dot"></div> Medium Compound (Backend / Java 21, Spring Boot)
          </button>
          <button 
            class={`tyre-tab ${activeFilter === 'hard' ? 'active' : ''}`}
            onClick={() => handleTabClick('hard')}
          >
            <div class="tyre-dot"></div> Hard Compound (DSA & Data / 600+ Problems, SQL, Kafka)
          </button>
          <button 
            class={`tyre-tab ${activeFilter === 'wet' ? 'active' : ''}`}
            onClick={() => handleTabClick('wet')}
          >
            <div class="tyre-dot"></div> Wet Compound (DevOps / Docker, REST/gRPC, Git)
          </button>
        </div>

        {/* Tech Stack Grid */}
        <div class="tech-grid" id="techGrid">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} class="tech-card">
              <div class="tech-icon-header">
                <div class="tech-icon"><i class="fa-solid fa-code"></i></div>
                <span class={`tech-compound-badge badge-${skill.compound}`}>
                  {skill.compound.toUpperCase()} COMPOUND
                </span>
              </div>
              <h3 class="tech-name">{skill.name}</h3>
              <p class="tech-desc">{skill.desc}</p>
              <ul class="tech-metrics-list">
                {Object.entries(skill.metrics).map(([k, v]) => (
                  <li key={k}><span>{k.toUpperCase()}</span><span>{v}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
