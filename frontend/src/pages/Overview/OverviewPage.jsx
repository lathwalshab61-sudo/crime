import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OverviewPage() {
  const navigate = useNavigate();
  const [scannerScale, setScannerScale] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, tag: 'AUTH', text: 'Terminal unlocked by badge #CS-9042', time: '10:32:01' },
    { id: 2, tag: 'AFIS', text: 'Latent print vector matched with CODIS record', time: '10:33:14' },
    { id: 3, tag: 'SPECTRA', text: '785nm Raman analysis: Synthetic accelerant detected', time: '10:35:40' },
  ]);

  const handleScannerClick = () => {
    setScannerScale(true);
    setTimeout(() => {
      setScannerScale(false);
    }, 400);
  };

  const handleLaunchTerminal = () => {
    setTerminalActive(!terminalActive);
    // Add a quick feedback log
    setTerminalLogs((prev) => [
      {
        id: Date.now(),
        tag: 'LIVE_EXEC',
        text: 'Interactive telemetry session linked to Dept #09',
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Live Dispatch Telemetry Ticker */}
      <div className="w-full bg-surface-container-lowest px-margin py-2.5 flex items-center justify-between shadow-sm border-b border-surface-container-high/40">
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container/20 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim mr-1 animate-ping"></span>
            DISPATCH
          </span>
          <p className="font-code-telemetry text-code-telemetry text-on-surface truncate">
            Cold Case <span className="text-primary-container font-semibold">#CR-2024-884</span> Reopened: DNA Phenotyping Match{' '}
            <span className="text-primary font-medium">94.6%</span>
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 pl-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-code-telemetry">LIVE</span>
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
        </div>
      </div>

      {/* Hero Section & Reticle Visualizer */}
      <section className="relative w-full px-margin py-space-lg flex flex-col items-center bg-gradient-to-b from-surface-container-lowest via-surface-container-low to-surface overflow-hidden">
        {/* Ambient Precision HUD Background Grid Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-inner mb-space-md z-10 border border-outline-variant/30">
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
            BIOMETRIC &amp; FORENSIC INTELLIGENCE SUITE • V4.2
          </span>
        </div>

        {/* Central Fingerprint Reticle Scanner Graphic */}
        <div
          onClick={handleScannerClick}
          className="relative w-48 h-48 my-space-xs flex items-center justify-center z-10 cursor-pointer select-none group"
          id="tactical-scanner"
          title="Click to trigger biometric calibration"
        >
          {/* Target Rings */}
          <div
            className="absolute inset-0 rounded-full border border-primary-container/20 animate-spin"
            style={{ animationDuration: '24s' }}
          ></div>
          <div className="absolute inset-3 rounded-full border border-dashed border-primary/30"></div>
          <div className="absolute inset-8 rounded-full border border-primary-container/40"></div>

          {/* Coordinate Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-primary-container/40 -translate-y-1/2"></div>
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-primary-container/40 -translate-x-1/2"></div>

          {/* Precision Coordinates HUD markers */}
          <span className="absolute top-1 left-2 font-code-telemetry text-[9px] text-primary/70">LAT 37.7749</span>
          <span className="absolute bottom-1 right-2 font-code-telemetry text-[9px] text-primary/70">AZM 142.8°</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>

          {/* Biometric Vector Core SVG */}
          <div
            className={`relative w-28 h-28 flex items-center justify-center rounded-full bg-surface-container/70 shadow-[0_0_24px_rgba(0,229,255,0.25)] transition-transform duration-300 ${
              scannerScale ? 'scale-110 rotate-12' : 'group-hover:scale-105'
            }`}
          >
            <svg
              className="w-20 h-20 text-primary-container drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
              viewBox="0 0 100 100"
            >
              <path d="M 50 15 A 35 35 0 0 0 20 45 C 20 65 30 80 34 88" opacity="0.35"></path>
              <path d="M 50 22 A 28 28 0 0 0 26 48 C 26 62 33 76 39 84" opacity="0.55"></path>
              <path d="M 50 30 A 20 20 0 0 0 33 50 C 33 62 38 73 44 80"></path>
              <path d="M 50 38 A 12 12 0 0 0 40 50 C 40 58 45 68 50 75"></path>
              <path d="M 50 15 A 35 35 0 0 1 80 45 C 80 65 70 80 66 88" opacity="0.35"></path>
              <path d="M 50 22 A 28 28 0 0 1 74 48 C 74 62 67 76 61 84" opacity="0.55"></path>
              <path d="M 50 30 A 20 20 0 0 1 67 50 C 67 62 62 73 56 80"></path>
              <path d="M 50 38 A 12 12 0 0 1 60 50 C 60 58 55 68 50 75"></path>
              <circle cx="50" cy="50" fill="currentColor" r="2.5"></circle>
            </svg>
          </div>

          {/* Telemetry Sub-nodes */}
          <div className="absolute bottom-4 left-3 w-5 h-5 rounded-full border border-primary-container/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
          </div>
          <div className="absolute top-6 right-4 w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
        </div>

        {/* Core Title & Subtitle */}
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface text-center tracking-tight mt-space-sm z-10">
          Every Evidence <br />
          <span className="text-primary-container drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            Tells a Story
          </span>
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-sm mt-space-sm leading-relaxed z-10">
          A next-generation digital forensics platform uniting crime scene investigation, molecular DNA sequencing, biometric fingerprint analytics, and chain-of-custody tracking.
        </p>

        {/* Tactical CTAs */}
        <div className="w-full max-w-md flex flex-col gap-space-sm mt-space-md z-10">
          <button
            onClick={handleLaunchTerminal}
            className="w-full py-3 px-space-md bg-primary-container text-on-primary-fixed font-headline-sm text-headline-sm uppercase tracking-wider rounded-lg shadow-[0_0_16px_rgba(0,229,255,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:brightness-110"
            id="launch-terminal-btn"
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span>Launch Case Terminal</span>
          </button>
          <button
            onClick={() => navigate('/evidence')}
            className="w-full py-3 px-space-md bg-surface-container-high hover:bg-surface-container-highest text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[20px]">folder_special</span>
            <span>Explore Evidence Vault</span>
          </button>
        </div>
      </section>

      {/* Metric HUD Strip */}
      <section className="w-full px-margin py-space-sm bg-surface-container-lowest">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm max-w-4xl mx-auto">
          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Vault Ledger</span>
              <span className="material-symbols-outlined text-primary-container text-[18px]">inventory_2</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">2,840+</span>
            <span className="font-code-telemetry text-[10px] text-primary">SECURE EVIDENCE LOGS</span>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Biometric Delta</span>
              <span className="material-symbols-outlined text-primary text-[18px]">fingerprint</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">99.8%</span>
            <span className="font-code-telemetry text-[10px] text-primary">MATCH ACCURACY</span>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Field Deployment</span>
              <span className="material-symbols-outlined text-tertiary-container text-[18px]">radar</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">42 Units</span>
            <span className="font-code-telemetry text-[10px] text-tertiary-container">ACTIVE CRIME SCENES</span>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Integrity Tier</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">ISO/IEC</span>
            <span className="font-code-telemetry text-[10px] text-secondary">17025 ACCREDITED</span>
          </div>
        </div>
      </section>

      {/* Academic Banner */}
      <section className="w-full px-margin py-space-sm max-w-4xl mx-auto">
        <div className="p-space-sm rounded-lg bg-surface-container-high flex items-center gap-space-sm shadow-md border border-outline-variant/20">
          <div className="w-10 h-10 rounded-DEFAULT bg-primary-container/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary-container text-[22px]">school</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-primary uppercase font-code-telemetry">
              University Academic Research Project
            </span>
            <span className="font-body-sm text-body-sm text-on-surface truncate">
              Criminology &amp; Forensic Science Division
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Quick Terminal Feed Drawer */}
      <div
        className={`mx-margin mb-space-sm p-space-sm rounded-lg bg-surface-container-lowest transition-all max-w-4xl md:mx-auto ${
          terminalActive ? 'ring-1 ring-primary-container shadow-[0_0_16px_rgba(0,229,255,0.25)]' : 'border border-outline-variant/20'
        }`}
        id="quick-terminal"
      >
        <div className="flex items-center justify-between pb-space-xs mb-space-xs border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary-container">terminal</span>
            <span className="font-code-telemetry text-code-telemetry text-primary uppercase">
              Tactical Telemetry Stream // Live Feed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary-container font-code-telemetry text-[10px] hover:underline flex items-center gap-0.5"
            >
              <span>FULL DASHBOARD</span>
              <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </button>
          </div>
        </div>
        <div className="space-y-1 font-code-telemetry text-[11px] text-on-surface-variant max-h-36 overflow-y-auto">
          {terminalLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 py-0.5">
              <span className="text-outline shrink-0">[{log.time}]</span>
              <span className="px-1 bg-surface-container text-primary-fixed-dim rounded shrink-0">{log.tag}</span>
              <span className="text-on-surface">{log.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Forensic Modalities Showcase */}
      <section className="w-full px-margin py-space-sm max-w-4xl mx-auto flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight">Forensic Modalities</h2>
          <button
            onClick={() => navigate('/forensic-lab')}
            className="text-primary-container font-label-sm text-label-sm hover:underline flex items-center gap-1"
          >
            <span>ENTER LAB SUITE</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Modality Card 1: Biometrics */}
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-DEFAULT bg-primary-container/20 text-primary font-code-telemetry text-[10px]">
                  IAFIS / NGI CONNECTED
                </span>
                <span className="font-code-telemetry text-[10px] text-on-surface-variant">AUTO-EXTRACT</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Latent Print Biometrics</h3>
            </div>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">fingerprint</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Level 1-3 friction ridge minutiae verification with automated Galton point clustering and core-delta triangulation.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">MINUTIAE: 48 DELTA PTS</span>
            <span className="font-label-sm text-label-sm text-primary">99.8% PROBABILITY</span>
          </div>
        </div>

        {/* Modality Card 2: DNA */}
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-DEFAULT bg-tertiary-container/20 text-tertiary-fixed-dim font-code-telemetry text-[10px]">
                  CODIS CORE 24-LOCI
                </span>
                <span className="font-code-telemetry text-[10px] text-on-surface-variant">STR SEQUENCING</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Next-Gen DNA &amp; STR Profiling</h3>
            </div>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[20px]">strikethrough_s</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Rapid capillary electrophoresis and mitochondrial lineage tracking with automated amelogenin gender confirmation.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">LOCI: D3S1358 • TH01 • D21S11</span>
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">CODIS MATCH CONFIRMED</span>
          </div>
        </div>

        {/* Modality Card 3: Serology */}
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-DEFAULT bg-secondary-container/30 text-secondary font-code-telemetry text-[10px]">
                  LUMINOL CHEMILUMINESCENCE
                </span>
                <span className="font-code-telemetry text-[10px] text-on-surface-variant">TRAJECTORY 3D</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Forensic Serology &amp; Spatter</h3>
            </div>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">bloodtype</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Impact angle trigonometry θ = arcsin(W/L), automated velocity stringing, and Kastle-Meyer catalytic presumptive assays.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">IMPACT θ: 34.2° ± 0.4°</span>
            <span className="font-label-sm text-label-sm text-secondary">HIGH VELOCITY SPATTER</span>
          </div>
        </div>

        {/* Modality Card 4: Documents */}
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-DEFAULT bg-primary-container/20 text-primary font-code-telemetry text-[10px]">
                  VSC 8000 SPECTRAL
                </span>
                <span className="font-code-telemetry text-[10px] text-on-surface-variant">INFRARED CHROMATOGRAPHY</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Questioned Document Examination</h3>
            </div>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Hyperspectral ink degradation profiles, obliterated text recovery, and fiber indentation analysis.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">SPECTRA: 785nm LASER</span>
            <span className="font-label-sm text-label-sm text-primary">LAYER RESTORED</span>
          </div>
        </div>

        {/* Modality Card 5: Cyber */}
        <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-outline-variant/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-DEFAULT bg-primary-container/20 text-primary font-code-telemetry text-[10px]">
                  SHA-256 HASH VERIFIED
                </span>
                <span className="font-code-telemetry text-[10px] text-on-surface-variant">BIT-STREAM IMAGE</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Digital Cyber-Forensics</h3>
            </div>
            <div className="w-9 h-9 rounded-DEFAULT bg-surface-container-high flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">memory</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Hardware write-blocked drive imaging, volatile RAM carving, unallocated cluster reconstruction, and metadata timestamp validation.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60">
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">DEVICE: 512GB NVME</span>
            <span className="font-label-sm text-label-sm text-primary">WRITE-BLOCKED</span>
          </div>
        </div>
      </section>

      {/* Interactive Evidence Tag Badge Showcase */}
      <section className="w-full px-margin py-space-md max-w-4xl mx-auto">
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm shadow-sm border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="font-headline-sm text-headline-sm text-on-surface">Active Evidence Tags</span>
            </div>
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">CHAIN OF CUSTODY</span>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {/* Evidence Tag 1 */}
            <div
              onClick={() => navigate('/evidence')}
              className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-container/30 text-tertiary-fixed-dim font-code-telemetry text-code-telemetry shrink-0 font-medium">
                  TAG-0824
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface truncate">9mm Spent Cartridge Casing</span>
                  <span className="font-code-telemetry text-[10px] text-on-surface-variant truncate">
                    Ballistics Lab // Shelf B-12
                  </span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container shrink-0" title="Secured in Vault"></span>
            </div>

            {/* Evidence Tag 2 */}
            <div
              onClick={() => navigate('/evidence')}
              className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded-DEFAULT bg-tertiary-container/30 text-tertiary-fixed-dim font-code-telemetry text-code-telemetry shrink-0 font-medium">
                  TAG-0825
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-body-sm text-on-surface truncate">Partial Latent Print on Glass</span>
                  <span className="font-code-telemetry text-[10px] text-on-surface-variant truncate">
                    Biometrics Lab // AFIS Pending
                  </span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim shrink-0" title="Processing"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

