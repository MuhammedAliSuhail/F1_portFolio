import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TelemetryHUD from './components/TelemetryHUD';
import TechGarage from './components/TechGarage';
import CareerCircuit from './components/CareerCircuit';
import ProjectsShowcase from './components/ProjectsShowcase';
import PitStopGame from './components/PitStopGame';
import TerminalCLI from './components/TerminalCLI';
import ContactRadio from './components/ContactRadio';
import Footer from './components/Footer';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div className="app-container">
      <Navbar audioEnabled={audioEnabled} setAudioEnabled={setAudioEnabled} />
      <main>
        <Hero />
        <TelemetryHUD />
        <TechGarage audioEnabled={audioEnabled} />
        <CareerCircuit audioEnabled={audioEnabled} />
        <ProjectsShowcase audioEnabled={audioEnabled} />
        <PitStopGame audioEnabled={audioEnabled} />
        <TerminalCLI audioEnabled={audioEnabled} />
        <ContactRadio audioEnabled={audioEnabled} />
      </main>
      <Footer />
    </div>
  );
}
