import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import { playBeep } from '../utils/audioSynth';

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

export default function ProjectsShowcase({ audioEnabled }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleInspect = (proj) => {
    playBeep(850, 0.1, 'sine', audioEnabled);
    setSelectedProject(proj);
  };

  return (
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-tag cyan">
          <i class="fa-solid fa-car-side"></i> Integration Chassis / Software Projects
        </div>
        <h2 class="section-title">High-Performance Chassis</h2>
        <p class="section-subtitle">Integration engines, Spring Boot microservices, and algorithmic data structures built by Muhammed Suhail.</p>

        <div class="projects-grid" id="projectsGrid">
          {projectsData.map((proj) => (
            <div key={proj.id} class="project-card">
              <div class="project-header-bar">
                <span class="project-chassis-no">{proj.chassisNo}</span>
                <span style={{ color: 'var(--sector-green)', fontWeight: 700 }}>● {proj.specs.status}</span>
              </div>
              <div class="project-body">
                <h3 class="project-title">{proj.title}</h3>
                <p class="project-summary">{proj.summary}</p>
                <div class="project-telemetry-specs">
                  <div><span class="spec-key">ENGINE:</span></div><div class="spec-val">{proj.specs.engine}</div>
                  <div><span class="spec-key">METRIC:</span></div><div class="spec-val">{proj.specs.throughput || proj.specs.problems}</div>
                  <div><span class="spec-key">PERFORMANCE:</span></div><div class="spec-val">{proj.specs.latency || proj.specs.complexity}</div>
                </div>
                <div class="project-tags">
                  {proj.tags.map((t, i) => <span key={i} class="tag-pill">{t}</span>)}
                </div>
                <div class="project-footer">
                  <button class="btn-telemetry-inspect" onClick={() => handleInspect(proj)}>
                    INSPECT CODE & SPECS <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
