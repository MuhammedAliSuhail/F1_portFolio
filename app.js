/* ==========================================================================
   MUHAMMED SUHAIL - INTEGRATION DEVELOPER PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEngine();
  initTelemetryChart();
  initGaugeTickers();
  initTechGarage();
  initCircuitTrack();
  initProjectsShowcase();
  initPitStopGame();
  initTerminalCLI();
  initContactForm();
});

/* ==========================================================================
   1. WEB AUDIO API SYNTHESIZER (RADIO BEEPS & F1 LIGHTS SOUNDS)
   ========================================================================== */
let audioEnabled = true;
let audioCtx = null;

function initAudioEngine() {
  const toggleBtn = document.getElementById('audioToggle');
  const icon = document.getElementById('audioIcon');

  toggleBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
      icon.className = 'fa-solid fa-volume-high';
      toggleBtn.style.color = 'var(--f1-red)';
      playBeep(800, 0.1);
    } else {
      icon.className = 'fa-solid fa-volume-xmark';
      toggleBtn.style.color = 'var(--text-dim)';
    }
  });
}

function playBeep(freq = 600, duration = 0.1, type = 'sine') {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio Context init error', e);
  }
}

function playLightsOutSound() {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

/* ==========================================================================
   2. REALTIME CANVAS TELEMETRY STREAM CHART
   ========================================================================== */
function initTelemetryChart() {
  const canvas = document.getElementById('latencyChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const dataPoints = [];
  const maxPoints = 50;
  for (let i = 0; i < maxPoints; i++) {
    dataPoints.push(1.4 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.25);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridYStep = canvas.height / 4;
    for (let y = gridYStep; y < canvas.height; y += gridYStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // New data point update
    dataPoints.shift();
    const lastVal = dataPoints[dataPoints.length - 1];
    const nextVal = Math.max(0.8, Math.min(3.2, lastVal + (Math.random() - 0.49) * 0.3));
    dataPoints.push(nextVal);

    // Draw line
    const stepX = canvas.width / (maxPoints - 1);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - (dataPoints[0] / 4) * canvas.height);

    for (let i = 1; i < dataPoints.length; i++) {
      const x = i * stepX;
      const y = canvas.height - (dataPoints[i] / 4) * canvas.height;
      ctx.lineTo(x, y);
    }

    // Create Petronas Teal Glow Gradient Fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 210, 190, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 210, 190, 0.0)');

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw stroke line
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

    // Pulse dot at current tip
    const currentX = canvas.width;
    const currentY = canvas.height - (nextVal / 4) * canvas.height;
    ctx.beginPath();
    ctx.arc(currentX - 4, currentY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#CCFF00';
    ctx.fill();

    // Live timestamp update
    const now = new Date();
    const timeStr = now.toISOString().substring(11, 19) + ' UTC';
    const timeEl = document.getElementById('liveTimestamp');
    if (timeEl) timeEl.textContent = timeStr + ' | HL7 LATENCY: ' + nextVal.toFixed(2) + 'ms';
  }

  setInterval(draw, 150);
}

/* ==========================================================================
   3. GAUGE TICKERS (RPM & CACHE HIT)
   ========================================================================== */
function initGaugeTickers() {
  const rpmVal = document.getElementById('rpmVal');
  const rpmBar = document.getElementById('rpmBar');
  const cacheVal = document.getElementById('cacheVal');
  const cacheBar = document.getElementById('cacheBar');

  setInterval(() => {
    const rpm = Math.floor(13900 + Math.random() * 850);
    const rpmPct = ((rpm / 15000) * 100).toFixed(1);
    if (rpmVal) rpmVal.textContent = rpm.toLocaleString() + ' MSG/MIN';
    if (rpmBar) rpmBar.style.width = rpmPct + '%';

    const cachePct = (99.4 + Math.random() * 0.5).toFixed(1);
    if (cacheVal) cacheVal.textContent = cachePct + '%';
    if (cacheBar) cacheBar.style.width = cachePct + '%';
  }, 1200);
}

/* ==========================================================================
   4. TECH GARAGE (MUHAMMED SUHAIL'S COMPOUND SETUP)
   ========================================================================== */
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

function initTechGarage() {
  const grid = document.getElementById('techGrid');
  const tabs = document.querySelectorAll('.tyre-tab');

  function renderCards(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? techSkillsData : techSkillsData.filter(s => s.compound === filter);

    filtered.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'tech-card';

      let badgeClass = 'badge-' + skill.compound;
      let badgeLabel = skill.compound.toUpperCase() + ' COMPOUND';

      card.innerHTML = `
        <div class="tech-icon-header">
          <div class="tech-icon"><i class="fa-solid fa-code"></i></div>
          <span class="tech-compound-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <h3 class="tech-name">${skill.name}</h3>
        <p class="tech-desc">${skill.desc}</p>
        <ul class="tech-metrics-list">
          ${Object.entries(skill.metrics).map(([k, v]) => `<li><span>${k.toUpperCase()}</span><span>${v}</span></li>`).join('')}
        </ul>
      `;
      grid.appendChild(card);
    });
  }

  renderCards('all');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playBeep(700, 0.05);
      renderCards(tab.getAttribute('data-compound'));
    });
  });
}

/* ==========================================================================
   5. CAREER TRACK CIRCUIT (MUHAMMED SUHAIL'S SECTORS)
   ========================================================================== */
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

function initCircuitTrack() {
  const paths = document.querySelectorAll('.sector-path');
  const detailsPanel = document.getElementById('sectorDetailsPanel');

  function renderSector(sectorId) {
    const data = careerSectors[sectorId];
    if (!data) return;

    detailsPanel.innerHTML = `
      <div class="sector-card" data-sector="${sectorId}">
        <div class="sector-card-header">
          <span class="sector-name" style="color:var(--petronas-teal);">${data.sectorName}</span>
          <span class="sector-period">${data.period}</span>
        </div>
        <div class="sector-role">${data.role}</div>
        <ul class="sector-bullets">
          ${data.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  renderSector(1);

  paths.forEach(path => {
    path.addEventListener('click', () => {
      paths.forEach(p => p.classList.remove('active'));
      path.classList.add('active');
      const sectorId = path.getAttribute('data-sector');
      playBeep(900, 0.08);
      renderSector(sectorId);
    });
  });
}

/* ==========================================================================
   6. F1 RACE CHASSIS PROJECTS SHOWCASE & MODAL
   ========================================================================== */
const projectsData = [
  {
    id: 'rhapsody-fhir-bridge',
    chassisNo: 'CHASSIS #SUHAIL-01',
    title: 'Rhapsody HL7-to-FHIR Bridge Engine',
    summary: 'High-speed integration channel built in Orion Rhapsody parsing incoming HL7 v2 ADT/ORU messages and emitting validated FHIR R4 Patient & Encounter JSON resources.',
    specs: { engine: 'Rhapsody / JS Filters', throughput: '15,000 msg/min', latency: '1.2ms', status: 'PRODUCTION READY' },
    tags: ['Rhapsody Engine', 'HL7 v2.5', 'FHIR R4', 'MLLP Protocol', 'JavaScript'],
    codeSnippet: `// Rhapsody JavaScript Filter: HL7 v2 PID Segment -> FHIR Patient Resource
var pidSegment = input.getSegment("PID");
var patientId = pidSegment.getField(3, 1);
var familyName = pidSegment.getField(5, 1);
var givenName = pidSegment.getField(5, 2);

var fhirPatient = {
    resourceType: "Patient",
    id: patientId,
    name: [{ family: familyName, given: [givenName] }],
    gender: pidSegment.getField(8) === "M" ? "male" : "female"
};

output.setText(JSON.stringify(fhirPatient));`
  },
  {
    id: 'mediconnect-spring',
    chassisNo: 'CHASSIS #SUHAIL-02',
    title: 'MediConnect Backend Microservice',
    summary: 'Enterprise Spring Boot 3 backend service managing patient medical records, RESTful API routing, JWT security, and Redis cache synchronization.',
    specs: { engine: 'Java 21 / Spring Boot 3', throughput: '40,000 req/sec', latency: '3.5ms', status: 'POLE POSITION' },
    tags: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Redis'],
    codeSnippet: `@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    private final PatientIntegrationService patientService;

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientFHIR(@PathVariable String id) {
        PatientDTO patient = patientService.findPatientWithCache(id);
        return ResponseEntity.ok(patient);
    }
}`
  },
  {
    id: 'algogrid-dsa',
    chassisNo: 'CHASSIS #SUHAIL-03',
    title: 'AlgoGrid 600+ DSA Solutions Engine',
    summary: 'Comprehensive high-performance repository of 600+ Data Structures & Algorithms solutions in Java, benchmarked for optimal O(1)/O(log N) time and space complexity.',
    specs: { engine: 'Java / DSA Core', problems: '600+ Solved', complexity: 'O(log N)', status: 'QUALIFYING RECORD' },
    tags: ['Java', 'Graph Algorithms', 'Dynamic Programming', 'Trees', 'LeetCode 600+'],
    codeSnippet: `// Efficient Graph Shortest Path (Dijkstra's Algorithm O(E log V))
public int[] shortestPath(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
    PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.distance - b.distance);
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[S] = 0;
    pq.add(new Pair(0, S));

    while (!pq.isEmpty()) {
        Pair curr = pq.poll();
        for (ArrayList<Integer> iter : adj.get(curr.node)) {
            int adjNode = iter.get(0), weight = iter.get(1);
            if (curr.distance + weight < dist[adjNode]) {
                dist[adjNode] = curr.distance + weight;
                pq.add(new Pair(dist[adjNode], adjNode));
            }
        }
    }
    return dist;
}`
  }
];

function initProjectsShowcase() {
  const grid = document.getElementById('projectsGrid');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');

  projectsData.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
      <div class="project-header-bar">
        <span class="project-chassis-no">${proj.chassisNo}</span>
        <span style="color:var(--sector-green); font-weight:700;">● ${proj.specs.status}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-summary">${proj.summary}</p>
        <div class="project-telemetry-specs">
          <div><span class="spec-key">ENGINE:</span></div><div class="spec-val">${proj.specs.engine}</div>
          <div><span class="spec-key">METRIC:</span></div><div class="spec-val">${proj.specs.throughput || proj.specs.problems}</div>
          <div><span class="spec-key">PERFORMANCE:</span></div><div class="spec-val">${proj.specs.latency || proj.specs.complexity}</div>
        </div>
        <div class="project-tags">
          ${proj.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <button class="btn-telemetry-inspect" data-proj="${proj.id}">
            INSPECT CODE & SPECS <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Event listener for inspect buttons
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-telemetry-inspect');
    if (btn) {
      const projId = btn.getAttribute('data-proj');
      const proj = projectsData.find(p => p.id === projId);
      if (proj) openModal(proj);
    }
  });

  function openModal(proj) {
    playBeep(850, 0.1);
    modalContent.innerHTML = `
      <div class="section-tag cyan">${proj.chassisNo} &bull; CODE & SPECS</div>
      <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; margin-bottom:1rem;">${proj.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:1.5rem;">${proj.summary}</p>
      
      <h4 style="font-family:var(--font-mono); color:var(--petronas-teal); margin-bottom:0.5rem;">CHASSIS CODE IMPLEMENTATION</h4>
      <pre style="background:#06080B; padding:1.25rem; border-radius:8px; border:1px solid var(--border-subtle); font-family:var(--font-mono); font-size:0.85rem; color:var(--speed-cyan); overflow-x:auto; margin-bottom:1.5rem;"><code>${escapeHtml(proj.codeSnippet)}</code></pre>
      
      <div style="display:flex; justify-content:flex-end;">
        <button class="btn-f1-secondary" id="modalDoneBtn">Close Inspection</button>
      </div>
    `;
    modal.classList.add('active');

    document.getElementById('modalDoneBtn').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ==========================================================================
   7. PIT STOP REACTION TIME & LATENCY BENCHMARK GAME
   ========================================================================== */
function initPitStopGame() {
  const lights = document.querySelectorAll('.light-bulb');
  const startBtn = document.getElementById('startLightsBtn');
  const statusText = document.getElementById('pitStatusText');
  const scoreVal = document.getElementById('reactionScore');
  const tierVal = document.getElementById('benchmarkTier');

  let gameState = 'IDLE'; // IDLE, LIGHTS_COUNTING, WAITING_LIGHTS_OUT, READY_TO_CLICK
  let startTime = 0;
  let countTimeout = null;

  startBtn.addEventListener('click', () => {
    if (gameState === 'IDLE') {
      startLightsSequence();
    } else if (gameState === 'WAITING_LIGHTS_OUT') {
      clearTimeout(countTimeout);
      lights.forEach(l => l.classList.remove('on'));
      statusText.innerHTML = '<span style="color:var(--f1-red);">FALSE START! JUMPED THE LIGHTS (+ 5s PENALTY)</span>';
      scoreVal.textContent = 'FALSE';
      tierVal.textContent = 'JUMPED START';
      startBtn.textContent = 'RETRY LAUNCH';
      gameState = 'IDLE';
      playLightsOutSound();
    } else if (gameState === 'READY_TO_CLICK') {
      const endTime = performance.now();
      const reactionTime = Math.round(endTime - startTime);
      playBeep(1200, 0.15);

      scoreVal.textContent = reactionTime + ' ms';

      let tier = '';
      if (reactionTime < 200) {
        tier = '🏎️ MUHAMMED SUHAIL POLE TIER (< 200MS RHAPSODY!)';
        tierVal.style.color = 'var(--speed-cyan)';
      } else if (reactionTime <= 270) {
        tier = '⚡ HL7 / FHIR FAST LANE LEGEND';
        tierVal.style.color = 'var(--sector-green)';
      } else if (reactionTime <= 360) {
        tier = '🔧 SOLID SPRING BOOT DEVELOPER';
        tierVal.style.color = 'var(--drs-amber)';
      } else {
        tier = '⚠️ ROUTE RETRY REQUIRED';
        tierVal.style.color = 'var(--f1-red)';
      }

      tierVal.textContent = tier;
      statusText.innerHTML = `<span style="color:var(--speed-cyan);">TRANSFORMATION TIME: ${reactionTime}ms</span>`;
      startBtn.textContent = 'GO AGAIN';
      gameState = 'IDLE';
    }
  });

  function startLightsSequence() {
    gameState = 'LIGHTS_COUNTING';
    lights.forEach(l => l.classList.remove('on'));
    statusText.textContent = 'LIGHTS COUNTDOWN INITIATED...';
    startBtn.textContent = 'WAIT FOR LIGHTS OUT!';

    let currentPair = 0;
    function lightUpNext() {
      if (currentPair < 5) {
        lights[currentPair * 2].classList.add('on');
        lights[currentPair * 2 + 1].classList.add('on');
        playBeep(500 + currentPair * 100, 0.1);
        currentPair++;
        countTimeout = setTimeout(lightUpNext, 1000);
      } else {
        gameState = 'WAITING_LIGHTS_OUT';
        statusText.textContent = 'STAY READY... LIGHTS COULD GO OUT AT ANY SECOND!';
        const randomDelay = 1500 + Math.random() * 2500;
        countTimeout = setTimeout(lightsOut, randomDelay);
      }
    }
    lightUpNext();
  }

  function lightsOut() {
    lights.forEach(l => l.classList.remove('on'));
    playLightsOutSound();
    startTime = performance.now();
    gameState = 'READY_TO_CLICK';
    statusText.innerHTML = '<span style="color:var(--sector-green); font-size:2rem;">LIGHTS OUT! CLICK NOW!</span>';
    startBtn.textContent = 'CLICK NOW!';
  }
}

/* ==========================================================================
   8. PIT-WALL CLI TERMINAL (MUHAMMED SUHAIL'S SHELL)
   ========================================================================== */
function initTerminalCLI() {
  const input = document.getElementById('terminalInput');
  const body = document.getElementById('terminalBody');
  if (!input || !body) return;

  const commands = {
    help: () => `Available Pit Commands:\n - <span style="color:var(--petronas-teal);">mercedes</span>  : Inspect Mercedes-AMG PETRONAS F1 team spec & W15 telemetry\n - <span style="color:#FFF;">skills</span>    : Display Muhammed Suhail's core tech compounds\n - <span style="color:#FFF;">dsa</span>       : Inspect 600+ Data Structures & Algorithms stats\n - <span style="color:#FFF;">hl7</span>       : View HL7 v2/v3 message mapping standards\n - <span style="color:#FFF;">fhir</span>      : View FHIR R4 resource transformation stats\n - <span style="color:#FFF;">projects</span>  : Show integration chassis & backend projects\n - <span style="color:#FFF;">fastest-lap</span>: Display engineer's fastest data transformation benchmark\n - <span style="color:#FFF;">contact</span>   : Print radio contact details\n - <span style="color:#FFF;">clear</span>     : Clear terminal screen`,
    mercedes: () => `🏎️ MERCEDES-AMG PETRONAS F1 INTEGRATION SPEC:\n &bull; Team & Garage : Mercedes-AMG PETRONAS F1 Team Fan & Integration Engineer\n &bull; Chassis / Engine: W15 E Performance / Orion Rhapsody v6.8 & Java 21\n &bull; Driver Designation: Muhammed Suhail (#44 / #10)\n &bull; Algorithmic Boost : 600+ Solved Data Structures & Algorithms Problems\n &bull; Pipeline Uptime   : 99.999% Reliability Record`,
    w15: () => `⚡ MERCEDES W15 TELEMETRY:\n Acceleration: 0-100 km/h in sub-millisecond HL7 parsing\n Top Speed   : 15,000 Messages / Min in Rhapsody Engine\n Fuel        : Java 21 Virtual Threads & Spring Boot 3 Microservices`,
    skills: () => `MUHAMMED SUHAIL'S TECH COMPOUNDS:\n [INTEGRATION] Orion Rhapsody Integration Engine, HL7 v2/v3, FHIR STU3/R4\n [BACKEND]     Java 21, Spring Boot 3, REST APIs, Microservices\n [ALGORITHMS]  600+ DSA Problems Solved (Trees, Graphs, DP, Arrays)\n [DATABASE]    PostgreSQL, Redis, Apache Kafka`,
    dsa: () => `📊 ALGORITHMIC PERFORMANCE:\n &bull; Total Problems Solved: 600+\n &bull; Primary Languages    : Java / C++\n &bull; Key Focus Areas     : Graphs (Dijkstra, BFS/DFS), Trees, DP, Heaps\n &bull; Optimization Level  : O(1) space & O(log N) runtime optimal`,
    hl7: () => `🏥 HL7 MAPPING TELEMETRY:\n &bull; Supported Messages  : ADT (A01/A04/A08), ORM (O01), ORU (R01)\n &bull; Processing Latency : < 1.2ms per message\n &bull; Network Protocol    : MLLP (Minimal Lower Layer Protocol)`,
    fhir: () => `🔥 FHIR INTEROPERABILITY:\n &bull; Target Specification: FHIR Release 4 (R4)\n &bull; Core Resources     : Patient, Encounter, Observation, DiagnosticReport\n &bull; Transformation Engine: Rhapsody JS Filters & Spring Boot HAPI FHIR`,
    projects: () => `CHASSIS REGISTER:\n 1. Rhapsody HL7-to-FHIR Bridge Engine (Rhapsody / JS)\n 2. MediConnect Microservice (Java 21 / Spring Boot 3)\n 3. AlgoGrid 600+ DSA Engine (Java / Data Structures)`,
    'fastest-lap': () => `🏎️ BRACKLEY FASTEST TRANSFORM RECORD:\n Track: Rhapsody MLLP Engine\n HL7 ➔ FHIR Conversion: 0.85ms\n Reliability: 99.999% Zero Data Loss`,
    contact: () => `TEAM RADIO CONTACT:\n Name         : Muhammed Suhail\n Role         : Mercedes-AMG PETRONAS Integration Engineer\n Specialization: Rhapsody | HL7 | FHIR | Java | Spring Boot | 600+ DSA`,
    sudo: () => `<span style="color:var(--petronas-teal);">Permission Denied: Only Muhammed Suhail holds root access to Brackley integration routes.</span>`,
    clear: 'CLEAR'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmdText = input.value.trim().toLowerCase();
      input.value = '';
      if (!cmdText) return;

      playBeep(900, 0.04);

      // Append prompt line
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      cmdLine.innerHTML = `<span class="terminal-prompt" style="color:var(--petronas-teal);">suhail@brackley-pit-wall:$</span> <span>${escapeHtml(cmdText)}</span>`;
      body.appendChild(cmdLine);

      if (cmdText === 'clear') {
        body.innerHTML = '';
        return;
      }

      const resLine = document.createElement('div');
      resLine.className = 'terminal-line';
      resLine.style.color = 'var(--text-main)';

      if (commands[cmdText]) {
        resLine.innerHTML = typeof commands[cmdText] === 'function' ? commands[cmdText]() : commands[cmdText];
      } else {
        resLine.innerHTML = `<span style="color:var(--ineos-red);">Command not found: '${escapeHtml(cmdText)}'. Type 'help' for command list.</span>`;
      }

      body.appendChild(resLine);
      body.scrollTop = body.scrollHeight;
    }
  });
}

/* ==========================================================================
   9. TEAM RADIO CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccessMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    playLightsOutSound();
    
    form.reset();
    successMsg.style.display = 'block';

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 6000);
  });
}
