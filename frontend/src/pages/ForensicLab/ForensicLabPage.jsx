import React, { useState, useEffect } from 'react';
import {
  runAFISScan,
  auditDNALoci,
  calculateTrajectory,
  testDocumentSpectra,
  verifyDigitalEvidence,
  getLiveTelemetry,
} from '../../services/api';

const defaultHashes = [
  'BLK-99824 // LAT: 42.3601',
  'BLK-99825 // SEC: CRYPTO-NODE',
  'BLK-99826 // CODIS-BATCH 14',
  'BLK-99827 // GC-MS CHROMATOGRAPHY',
  'BLK-99828 // STRAT-ANALYZER OK',
];

export default function ForensicLabPage() {
  const [workbenchState, setWorkbenchState] = useState('idle'); // idle | calibrating | engaged
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [telemetryHash, setTelemetryHash] = useState(defaultHashes[0]);
  const [isScanningMinutiae, setIsScanningMinutiae] = useState(false);
  const [minutiaeStatus, setMinutiaeStatus] = useState('EXTRACTED MINUTIAE: 42 PTS');
  const [scanBtnLabel, setScanBtnLabel] = useState('RUN MINUTIAE SCAN & MATCH');
  const [dnaAuditResult, setDnaAuditResult] = useState('');
  const [serologyCalculated, setSerologyCalculated] = useState('');
  const [docScanActive, setDocScanActive] = useState('');
  const [diskVerified, setDiskVerified] = useState('');

  // Fetch telemetry or cycle hashes
  useEffect(() => {
    const timer = setInterval(async () => {
      const live = await getLiveTelemetry();
      if (live && live.currentBlock) {
        setTelemetryHash(live.currentBlock);
      } else {
        setTelemetryIndex((prev) => {
          const next = (prev + 1) % defaultHashes.length;
          setTelemetryHash(defaultHashes[next]);
          return next;
        });
      }
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleLaunchWorkbench = () => {
    if (workbenchState !== 'idle') return;
    setWorkbenchState('calibrating');
    setTimeout(() => {
      setWorkbenchState('engaged');
      setTimeout(() => {
        setWorkbenchState('idle');
      }, 3000);
    }, 1200);
  };

  const handleScanMinutiae = async () => {
    if (isScanningMinutiae) return;
    setIsScanningMinutiae(true);
    setScanBtnLabel('EXTRACTING AFIS MINUTIAE VIA API...');
    setMinutiaeStatus('ANALYZING RIDGE DENSITY...');

    const apiResult = await runAFISScan('TAG-0825');
    setTimeout(() => {
      if (apiResult) {
        setMinutiaeStatus(`MATCH CONFIRMED: ${apiResult.extractedMinutiae} MINUTIAE PTS`);
        setScanBtnLabel(`AFIS COINCIDENCE ${apiResult.matchProbability} • ${apiResult.matchedSubject}`);
      } else {
        const count = Math.floor(Math.random() * 20) + 48;
        setMinutiaeStatus(`MATCH CONFIRMED: ${count} MINUTIAE PTS`);
        setScanBtnLabel('SCAN COMPLETE • AFIS COINCIDENCE 99.4%');
      }

      setTimeout(() => {
        setScanBtnLabel('RUN MINUTIAE SCAN & MATCH');
        setIsScanningMinutiae(false);
      }, 3500);
    }, 1200);
  };

  const handleAuditDNA = async () => {
    setDnaAuditResult('Querying CODIS database & analyzing capillary electrophoresis...');
    const result = await auditDNALoci('DNA-CR-2024-884');
    if (result) {
      setDnaAuditResult(
        `CODIS Match: ${result.matchCoincidence} | Result: ${result.genderResult} | Rank: ${result.codisRank}`
      );
    } else {
      setDnaAuditResult('Auditing 24 loci: Amelogenin (X/Y) Verified. CODIS Rank #0049');
    }
    setTimeout(() => setDnaAuditResult(''), 5000);
  };

  const handleSerologyCalc = async () => {
    setSerologyCalculated('Calculating impact angle θ = arcsin(W/L) via physics solver...');
    const result = await calculateTrajectory(12.4, 22.0);
    if (result) {
      setSerologyCalculated(
        `Impact θ: ${result.impactAngleDegrees} | Spatter: ${result.spatterClassification} | Origin: ${result.convergentOrigin.x}, ${result.convergentOrigin.y}, ${result.convergentOrigin.z}`
      );
    } else {
      setSerologyCalculated('Impact θ: 34.2° ± 0.4° | Origin: X: 1.84m, Y: 0.92m, Z: 1.25m');
    }
    setTimeout(() => setSerologyCalculated(''), 5000);
  };

  const handleDocTest = async () => {
    setDocScanActive('Running VSC 8000 infrared spectral comparator absorption scan...');
    const result = await testDocumentSpectra('DOC-CR-2024-771', '850nm');
    if (result) {
      setDocScanActive(`${result.resultSummary} (Wavelength: ${result.testedWavelength})`);
    } else {
      setDocScanActive('Spectral Test Complete: 2 discrete ink formula signatures separated at 850nm.');
    }
    setTimeout(() => setDocScanActive(''), 5000);
  };

  const handleDiskVerify = async () => {
    setDiskVerified('Validating SHA-256 hash against evidence ledger block...');
    const result = await verifyDigitalEvidence(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      '512GB-NVME'
    );
    if (result) {
      setDiskVerified(
        `Integrity: ${result.integrityStatus} | Bad Sectors: ${result.badSectors} | Write-Block: ACTIVE`
      );
    } else {
      setDiskVerified('Physical Disk Verification Successful: 0 Bad sectors, hardware write-block intact.');
    }
    setTimeout(() => setDiskVerified(''), 5000);
  };

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex flex-col w-full px-gutter pb-space-2xl space-y-space-lg max-w-4xl mx-auto">
        {/* Operational Status Telemetry Banner */}
        <div className="w-full rounded-xl bg-surface-container-low p-space-md shadow-md flex items-center justify-between border border-outline-variant/20 mt-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-highest text-primary-container shrink-0">
              <span className="material-symbols-outlined text-[18px]">biotech</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest truncate">
                  CENTRAL FORENSICS LAB // STATION-04
                </span>
              </div>
              <span className="font-code-telemetry text-code-telemetry text-on-surface-variant truncate">
                DIAGNOSTIC STATUS: ALL ANALYZERS NOMINAL
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded bg-surface-container-highest border border-primary-container/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-code-telemetry text-code-telemetry text-primary-container">ONLINE</span>
          </div>
        </div>

        {/* Header Section with Tactical Subtitle */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]">science</span>
            <span className="font-code-telemetry text-code-telemetry text-primary-container uppercase tracking-wider">
              MODULAR SUITE v4.12
            </span>
          </div>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight">
            Forensic Laboratory Instrumentation
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Advanced chemical, biometric, and digital analysis suites configured for high-fidelity evidentiary intake.
          </p>
        </div>

        {/* Interactive Virtual Workbench Hero Card */}
        <div className="relative w-full rounded-xl bg-surface-container-high p-space-lg shadow-xl overflow-hidden border border-outline-variant/30 group">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col space-y-space-md relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-sm text-label-sm uppercase tracking-wider">
                CHAIN OF CUSTODY ASSURED
              </span>
              <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                ISO/IEC 17025 ACCREDITED
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-primary">
                Launch Virtual Forensic Workbench
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Multi-spectral workbench for interactive artifact dissection, real-time spectrometer feeds, and authenticated evidence logging.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleLaunchWorkbench}
                className="flex-1 py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,229,255,0.3)] active:scale-[0.98] transition-transform hover:brightness-110"
                id="launchWorkbenchBtn"
              >
                {workbenchState === 'idle' && (
                  <>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    <span>INITIALIZE BENCH</span>
                  </>
                )}
                {workbenchState === 'calibrating' && (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>CALIBRATING WORKBENCH...</span>
                  </>
                )}
                {workbenchState === 'engaged' && (
                  <>
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>WORKBENCH ENGAGED</span>
                  </>
                )}
              </button>
              <button
                aria-label="Workbench settings"
                className="w-11 h-11 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center shrink-0 active:scale-95 transition-transform hover:text-primary border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Active Telemetry Simulation Box */}
        <div className="w-full rounded-xl bg-surface-container-lowest p-space-md shadow-md flex flex-col space-y-2 border border-outline-variant/20" id="telemetryBox">
          <div className="flex items-center justify-between">
            <span className="font-code-telemetry text-code-telemetry text-primary-container flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              SYSTEM TELEMETRY STREAM
            </span>
            <span className="font-code-telemetry text-code-telemetry text-on-surface-variant" id="telemetryHash">
              {telemetryHash}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-surface-container p-2 rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">CODIS QUEUE</span>
              <span className="font-code-telemetry text-code-telemetry text-primary font-semibold">4 BATCHES</span>
            </div>
            <div className="bg-surface-container p-2 rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">AFIS SAMPLES</span>
              <span className="font-code-telemetry text-code-telemetry text-primary font-semibold">128 LIDS</span>
            </div>
            <div className="bg-surface-container p-2 rounded flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">RAM ARMORED</span>
              <span className="font-code-telemetry text-code-telemetry text-primary font-semibold">SECURE</span>
            </div>
          </div>
        </div>

        {/* Forensic Disciplines Cards Stack */}
        <div className="flex flex-col space-y-space-md">
          {/* 1. Biometric Fingerprint Analysis */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col space-y-space-md transition-all border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">fingerprint</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Biometric Fingerprint Analysis
                  </h3>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    AFIS / IAFIS PROTOCOL SUITE
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm shrink-0">
                AFIS / IAFIS
              </span>
            </div>

            {/* Technical Preview HUD Graphic */}
            <div className="relative w-full h-36 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center border border-primary-container/20">
              <svg className="w-28 h-28 text-primary-container opacity-80" fill="none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1"></circle>
                <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5"></circle>
                <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1"></circle>
                <path d="M50 0 V100 M0 50 H100" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.75"></path>
                <circle className="animate-ping" cx="42" cy="38" fill="#00e5ff" r="2.5"></circle>
                <circle cx="58" cy="54" fill="#00e5ff" r="2.5"></circle>
                <circle cx="48" cy="62" fill="#00e5ff" r="2.5"></circle>
                <circle cx="36" cy="50" fill="#00e5ff" r="2.5"></circle>
              </svg>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high/90 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span className="font-code-telemetry text-code-telemetry text-on-surface" id="minutiaeCount">
                  {minutiaeStatus}
                </span>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-surface-container-high/90 text-primary-container font-code-telemetry text-code-telemetry">
                RES: 1200 DPI
              </div>
            </div>

            {/* Feature Matrix */}
            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">radar</span>
                <span className="font-body-sm text-body-sm truncate">Ridge Bifurcation Detection</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">grain</span>
                <span className="font-body-sm text-body-sm truncate">Poroscopy Micro-Mapping</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">account_tree</span>
                <span className="font-body-sm text-body-sm truncate">Henry Classification Class</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">layers</span>
                <span className="font-body-sm text-body-sm truncate">Level 1-3 Minutiae Vector</span>
              </div>
            </div>

            {/* Interactive Action Trigger */}
            <button
              onClick={handleScanMinutiae}
              disabled={isScanningMinutiae}
              className="w-full py-2.5 px-space-md rounded bg-surface-container-high text-primary hover:text-primary-container flex items-center justify-center gap-2 font-label-md text-label-md transition-colors active:bg-surface-container-highest border border-outline-variant/30 hover:brightness-110"
              id="scanMinutiaeBtn"
            >
              <span className="material-symbols-outlined text-[18px]">document_scanner</span>
              <span>{scanBtnLabel}</span>
            </button>
          </div>

          {/* 2. DNA & STR Profiling Suite */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col space-y-space-md border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">strikethrough_s</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    DNA &amp; STR Profiling Suite
                  </h3>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    HIGH RESOLUTION GENOMIC MATRIX
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-on-tertiary-container font-label-sm text-label-sm shrink-0">
                CODIS COMPLIANT
              </span>
            </div>

            {/* Electrophoresis Visualizer Simulation */}
            <div className="w-full bg-surface-container-lowest p-space-sm rounded-lg flex flex-col space-y-1.5 border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface-variant font-code-telemetry text-code-telemetry">
                <span>GEL ELECTROPHORESIS 24-LOCI</span>
                <span className="text-primary-container">MATCH: 99.98%</span>
              </div>
              <div className="grid grid-cols-8 gap-1.5 h-16 items-end p-1.5 bg-surface-container-low rounded">
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1 bg-primary-container rounded"></div>
                  <div className="h-1.5 bg-primary-container/80 rounded"></div>
                  <div className="h-1 bg-primary-container/40 rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1 bg-primary-container/30 rounded"></div>
                  <div className="h-2 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container/60 rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1.5 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container/30 rounded"></div>
                  <div className="h-2 bg-primary-container rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-2 bg-primary-container/90 rounded"></div>
                  <div className="h-1 bg-primary-container/20 rounded"></div>
                  <div className="h-1 bg-primary-container rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1 bg-primary-container/40 rounded"></div>
                  <div className="h-1.5 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container/50 rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-2 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container/70 rounded"></div>
                  <div className="h-1.5 bg-primary-container rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1 bg-primary-container/30 rounded"></div>
                  <div className="h-1 bg-primary-container/40 rounded"></div>
                  <div className="h-2 bg-primary-container rounded"></div>
                </div>
                <div className="h-full bg-surface-container-highest rounded-sm flex flex-col justify-around py-1">
                  <div className="h-1.5 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container rounded"></div>
                  <div className="h-1 bg-primary-container/50 rounded"></div>
                </div>
              </div>
            </div>

            {dnaAuditResult && (
              <div className="p-2.5 rounded bg-surface-container-highest text-primary font-code-telemetry text-xs animate-fadeIn border border-primary-container/30">
                {dnaAuditResult}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">cyclone</span>
                <span className="font-body-sm text-body-sm truncate">PCR Thermal Amplification</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">bar_chart</span>
                <span className="font-body-sm text-body-sm truncate">Short Tandem Repeat Match</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">blur_on</span>
                <span className="font-body-sm text-body-sm truncate">mtDNA Lineage Analysis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">verified_user</span>
                <span className="font-body-sm text-body-sm truncate">CODIS Database Sync</span>
              </div>
            </div>

            <button
              onClick={handleAuditDNA}
              className="w-full py-2.5 px-space-md rounded bg-surface-container-high text-primary flex items-center justify-center gap-2 font-label-md text-label-md transition-colors active:bg-surface-container-highest border border-outline-variant/30 hover:text-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
              <span>AUDIT 24-LOCUS AMELOGENIN PROFILE</span>
            </button>
          </div>

          {/* 3. Serology & Bloodstain Pattern Analysis (BPA) */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col space-y-space-md border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">bloodtype</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Serology &amp; Bloodstain Pattern
                  </h3>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    FLUID KINEMATICS &amp; CHEMIC PHENOTYPE
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm shrink-0">
                CHEMILUMINESCENCE
              </span>
            </div>

            {/* Kinematics Trajectory Mini-Widget */}
            <div className="w-full rounded-lg bg-surface-container-lowest p-space-sm flex items-center justify-between border border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">IMPACT ANGLE VECTORS</span>
                <span className="font-code-telemetry text-code-telemetry text-primary">
                  θ = arcsin(W/L) : 34.2° ± 0.4°
                </span>
              </div>
              <div className="px-2 py-1 rounded bg-surface-container-high text-primary-container font-code-telemetry text-code-telemetry">
                SPATTER: HIGH VELOCITY
              </div>
            </div>

            {serologyCalculated && (
              <div className="p-2.5 rounded bg-surface-container-highest text-primary font-code-telemetry text-xs animate-fadeIn border border-primary-container/30">
                {serologyCalculated}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">flare</span>
                <span className="font-body-sm text-body-sm truncate">Luminol Catalytic React</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">science</span>
                <span className="font-body-sm text-body-sm truncate">Kastle-Meyer Presumptive</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">straighten</span>
                <span className="font-body-sm text-body-sm truncate">3D Stringing Trajectory</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">adjust</span>
                <span className="font-body-sm text-body-sm truncate">Origin Point Triangulation</span>
              </div>
            </div>

            <button
              onClick={handleSerologyCalc}
              className="w-full py-2.5 px-space-md rounded bg-surface-container-high text-primary flex items-center justify-center gap-2 font-label-md text-label-md transition-colors active:bg-surface-container-highest border border-outline-variant/30 hover:text-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>CALCULATE IMPACT TRAJECTORY MATRIX</span>
            </button>
          </div>

          {/* 4. Questioned Document Examination */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col space-y-space-md border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">description</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Questioned Document Examination
                  </h3>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    INFRARED &amp; CHEMICAL FORENSICS
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm shrink-0">
                SPECTRAL COMPARATOR
              </span>
            </div>

            {/* Spectral Bandwidth Bar */}
            <div className="w-full bg-surface-container-lowest p-space-sm rounded-lg flex flex-col space-y-1 border border-outline-variant/20">
              <div className="flex justify-between font-code-telemetry text-code-telemetry text-on-surface-variant">
                <span>VSC 8000 MULTI-SPECTRAL</span>
                <span className="text-primary-container">400nm - 1000nm IR</span>
              </div>
              <div className="w-full h-2 rounded bg-surface-container-high overflow-hidden flex">
                <div className="h-full bg-secondary w-1/4"></div>
                <div className="h-full bg-primary-container w-1/3"></div>
                <div className="h-full bg-primary-fixed-dim w-1/4"></div>
                <div className="h-full bg-primary w-1/6"></div>
              </div>
            </div>

            {docScanActive && (
              <div className="p-2.5 rounded bg-surface-container-highest text-primary font-code-telemetry text-xs animate-fadeIn border border-primary-container/30">
                {docScanActive}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">visibility</span>
                <span className="font-body-sm text-body-sm truncate">VSC 8000 Spectral Analysis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">colorize</span>
                <span className="font-body-sm text-body-sm truncate">TLC Ink Chromatography</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">texture</span>
                <span className="font-body-sm text-body-sm truncate">ESDA Indented Writing</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">history_edu</span>
                <span className="font-body-sm text-body-sm truncate">Typography &amp; Seal Verification</span>
              </div>
            </div>

            <button
              onClick={handleDocTest}
              className="w-full py-2.5 px-space-md rounded bg-surface-container-high text-primary flex items-center justify-center gap-2 font-label-md text-label-md transition-colors active:bg-surface-container-highest border border-outline-variant/30 hover:text-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
              <span>COMMENCE INFRARED INK ABSORPTION TEST</span>
            </button>
          </div>

          {/* 5. Digital Forensics & Incident Response */}
          <div className="rounded-xl bg-surface-container p-space-md shadow-lg flex flex-col space-y-space-md border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Digital Forensics &amp; Incident Response
                  </h3>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    BIT-STREAM IMAGE EVIDENCE EXTRACTION
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm shrink-0">
                WRITE-BLOCKER ARMORED
              </span>
            </div>

            {/* Hash Validation Display Box */}
            <div className="w-full rounded-lg bg-surface-container-lowest p-space-sm flex flex-col space-y-1 border border-outline-variant/20">
              <div className="flex items-center justify-between font-code-telemetry text-code-telemetry">
                <span className="text-on-surface-variant">TARGET SHA-256 SUM:</span>
                <span className="text-primary-container">MATCH VERIFIED</span>
              </div>
              <div className="font-code-telemetry text-[10px] text-on-surface truncate bg-surface-container-high p-1.5 rounded select-all">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
            </div>

            {diskVerified && (
              <div className="p-2.5 rounded bg-surface-container-highest text-primary font-code-telemetry text-xs animate-fadeIn border border-primary-container/30">
                {diskVerified}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">lock</span>
                <span className="font-body-sm text-body-sm truncate">Hardware Write-Block Protection</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">smartphone</span>
                <span className="font-body-sm text-body-sm truncate">Cellebrite UFED Mobile Dump</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">memory</span>
                <span className="font-body-sm text-body-sm truncate">Volatile RAM Artifact Capture</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-2 rounded">
                <span className="material-symbols-outlined text-primary-container text-[16px]">enhanced_encryption</span>
                <span className="font-body-sm text-body-sm truncate">Steganography Pixel Decoding</span>
              </div>
            </div>

            <button
              onClick={handleDiskVerify}
              className="w-full py-2.5 px-space-md rounded bg-surface-container-high text-primary flex items-center justify-center gap-2 font-label-md text-label-md transition-colors active:bg-surface-container-highest border border-outline-variant/30 hover:text-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">security</span>
              <span>VERIFY CRIME SCENE PHYSICAL DISK IMAGE</span>
            </button>
          </div>
        </div>

        {/* Chain of Custody Protocol Notice Footer Card */}
        <div className="w-full rounded-xl bg-surface-container-low p-space-md shadow-md flex items-start gap-space-sm border border-outline-variant/20">
          <span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">policy</span>
          <div className="flex flex-col space-y-1">
            <span className="font-label-md text-label-md text-on-surface">
              Digital Chain of Custody Cryptographic Ledger Active
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Every reagent reaction, spectrometer reading, and extraction binary is instantly signed with an SHA-512 custody hash and recorded into the jurisdictional courtroom evidentiary vault.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
