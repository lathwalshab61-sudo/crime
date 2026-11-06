import React, { useState } from 'react';

const sceneDatabase = {
  alpha: {
    code: 'ALPHA-1',
    id: 'SCENE #NYC-2024-098',
    name: 'Northside Docks - Pier 44',
    coord: 'LAT: 40.7128° N | LONG: -74.0060° W',
    statusPill: 'SEALED',
    statusClass: 'bg-primary-container/15 text-primary-container',
    statusDesc: 'PERIMETER SECURED - LUMINOL REAGENTS DEPLOYED. CHAIN OF CUSTODY INTEGRITY: 100%.',
    temp: '14°C',
    humidity: '62%',
    wind: '4 kt NW',
    surfaceTemp: '11.2°C',
    dewPoint: '7°C',
    windVector: 'NW 320°',
    evidenceText: '7 Evidence Items',
    evidenceTags: ['#EV-01', '#EV-02', '#EV-03', '#EV-04', '#EV-05', '#EV-06', '#EV-07'],
    spheres: '14 High-Res Spheres',
    lidar: '3 LiDAR 3D Meshes',
    lead: 'Detective Miller',
    unit: 'CSI Field Recon Unit 4',
    quick: 'ALPHA-1: PERIMETER SEALED // LUMINOL ACTIVE',
  },
  bravo: {
    code: 'BRAVO-2',
    id: 'SCENE #NYC-2024-102',
    name: 'Apex Biochemical Research Lab',
    coord: 'LAT: 40.7484° N | LONG: -73.9857° W',
    statusPill: 'HAZMAT L2',
    statusClass: 'bg-tertiary-container/20 text-tertiary-fixed-dim',
    statusDesc: 'CHAIN OF CUSTODY ACTIVE - HAZMAT LEVEL 2 BIOHAZARD PROTOCOLS IN EFFECT.',
    temp: '19°C',
    humidity: '41%',
    wind: '0 kt CALM',
    surfaceTemp: '18.0°C',
    dewPoint: '5°C',
    windVector: 'CALM 0°',
    evidenceText: '12 Evidence Items',
    evidenceTags: ['#EV-10', '#EV-11', '#EV-12', '#EV-13', '#EV-14', '#EV-15', '#EV-16'],
    spheres: '26 High-Res Spheres',
    lidar: '5 LiDAR 3D Meshes',
    lead: 'Dr. Evelyn Vance',
    unit: 'Hazmat Forensic Division',
    quick: 'BRAVO-2: ACTIVE CHAIN // BIO-SAFETY SEAL',
  },
  charlie: {
    code: 'CHARLIE-3',
    id: 'SCENE #NYC-2024-089',
    name: 'Old Town Abandoned Vault',
    coord: 'LAT: 40.7061° N | LONG: -74.0089° W',
    statusPill: 'BALLISTICS',
    statusClass: 'bg-secondary-container/30 text-secondary',
    statusDesc: 'BALLISTICS TRAJECTORY RECONSTRUCTION IN PROGRESS - LASER SPECTROMETRY LOGGED.',
    temp: '9°C',
    humidity: '78%',
    wind: '1 kt SE',
    surfaceTemp: '8.4°C',
    dewPoint: '6°C',
    windVector: 'SE 140°',
    evidenceText: '5 Evidence Items',
    evidenceTags: ['#EV-21', '#EV-22', '#EV-23', '#EV-24', '#EV-25'],
    spheres: '9 High-Res Spheres',
    lidar: '2 LiDAR 3D Meshes',
    lead: 'Investigator S. Thorne',
    unit: 'Ballistics Recon Squad',
    quick: 'CHARLIE-3: TRAJECTORY SCAN // 5 SHELLS FOUND',
  },
};

export default function LocationsPage() {
  const [selectedKey, setSelectedKey] = useState('alpha');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMeshModal, setShowMeshModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentScene = sceneDatabase[selectedKey];

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
    if (filterType === 'cold') {
      setSelectedKey('charlie');
    } else if (filterType === 'transit') {
      setSelectedKey('bravo');
    } else {
      setSelectedKey('alpha');
    }
  };

  const handleActionToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex flex-col w-full pb-6 space-y-4 max-w-4xl mx-auto">
        {/* Sub-header & Status Strip */}
        <div className="px-margin flex flex-col space-y-2 mt-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary-container text-[20px]">share_location</span>
              <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Tactical Geo-Tracker</h1>
            </div>
            <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-container/15 text-primary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 border border-primary-container/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
              LiDAR Telemetry
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-code-telemetry text-code-telemetry bg-surface-container-low px-3 py-1.5 rounded-DEFAULT border border-outline-variant/20">
            <span>GRID: 40.7128° N, 74.0060° W</span>
            <span className="text-tertiary-fixed-dim">SAT-LINK: LOCK-9 (99.8%)</span>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mx-margin p-2.5 rounded bg-surface-container-high text-primary-container border border-primary-container/40 font-code-telemetry text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filter Toggles (Pill Selectors) */}
        <div className="px-margin flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleFilterChange('all')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm uppercase tracking-wider transition-all select-none ${
              activeFilter === 'all'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            All Active (3)
          </button>
          <button
            onClick={() => handleFilterChange('cold')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm uppercase tracking-wider transition-all select-none ${
              activeFilter === 'cold'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            Cold Cases (12)
          </button>
          <button
            onClick={() => handleFilterChange('transit')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm uppercase tracking-wider transition-all select-none ${
              activeFilter === 'transit'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            Courier Transit (2)
          </button>
        </div>

        {/* Interactive Tactical Map Canvas Box */}
        <div className="px-margin">
          <div className="relative w-full h-72 rounded-lg bg-surface-container-lowest overflow-hidden shadow-[0_4px_20px_rgba(3,7,18,0.85)] flex flex-col justify-between p-3 select-none border border-outline-variant/30">
            {/* Coordinate Crosshair Backdrop / SVG HUD */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tacticalGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#262a34" strokeWidth="0.8"></path>
                  <circle cx="16" cy="16" r="0.8" fill="#00daf3" opacity="0.4"></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tacticalGrid)"></rect>
              {/* Radar Scanning Wave Effect */}
              <circle cx="50%" cy="48%" r="65" fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 6" opacity="0.45"></circle>
              <circle cx="50%" cy="48%" r="110" fill="none" stroke="#00e5ff" strokeWidth="0.75" strokeDasharray="2 8" opacity="0.25"></circle>
              <line x1="0" y1="48%" x2="100%" y2="48%" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3"></line>
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3"></line>
            </svg>

            {/* Map HUD Corner Metadata */}
            <div className="relative z-10 flex justify-between items-start text-on-surface-variant font-code-telemetry text-code-telemetry">
              <div className="flex items-center gap-1 bg-surface-container-lowest/80 px-2 py-0.5 rounded-DEFAULT backdrop-blur-sm border border-outline-variant/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span>HUD: REALTIME RECON</span>
              </div>
              <div className="bg-surface-container-lowest/80 px-2 py-0.5 rounded-DEFAULT backdrop-blur-sm text-right border border-outline-variant/30">
                <span>MAG 4.2x // AZIMUTH 312°</span>
              </div>
            </div>

            {/* Tactical Pin Markers */}
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {/* Pin 1: ALPHA-1 */}
              <button
                onClick={() => setSelectedKey('alpha')}
                className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  {selectedKey === 'alpha' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-60"></span>
                  )}
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-surface-container-lowest items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.7)] border border-primary-container">
                    <span className="material-symbols-outlined text-[15px] text-primary-container">biotech</span>
                  </span>
                </span>
                <span className="mt-1 px-1.5 py-0.5 bg-surface-container-lowest/90 rounded-DEFAULT text-primary font-code-telemetry text-code-telemetry tracking-tighter border border-outline-variant/30">
                  ALPHA-1
                </span>
              </button>

              {/* Pin 2: BRAVO-2 */}
              <button
                onClick={() => setSelectedKey('bravo')}
                className="absolute top-[48%] right-[24%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  {selectedKey === 'bravo' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-60"></span>
                  )}
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-surface-container-lowest items-center justify-center shadow-[0_0_8px_rgba(255,198,129,0.5)] border border-tertiary-container">
                    <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">warning</span>
                  </span>
                </span>
                <span className="mt-1 px-1.5 py-0.5 bg-surface-container-lowest/90 rounded-DEFAULT text-tertiary-fixed-dim font-code-telemetry text-code-telemetry tracking-tighter border border-outline-variant/30">
                  BRAVO-2
                </span>
              </button>

              {/* Pin 3: CHARLIE-3 */}
              <button
                onClick={() => setSelectedKey('charlie')}
                className="absolute bottom-[20%] left-[45%] -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  {selectedKey === 'charlie' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-60"></span>
                  )}
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-surface-container-lowest items-center justify-center shadow-[0_0_8px_rgba(180,197,255,0.5)] border border-secondary">
                    <span className="material-symbols-outlined text-[15px] text-secondary">gps_fixed</span>
                  </span>
                </span>
                <span className="mt-1 px-1.5 py-0.5 bg-surface-container-lowest/90 rounded-DEFAULT text-secondary font-code-telemetry text-code-telemetry tracking-tighter border border-outline-variant/30">
                  CHARLIE-3
                </span>
              </button>
            </div>

            {/* Bottom Map Status Overlay */}
            <div className="relative z-10 flex items-center justify-between bg-surface-container-low/90 backdrop-blur-md px-2.5 py-1.5 rounded-DEFAULT border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface truncate">
                <span className="material-symbols-outlined text-[14px] text-primary-container">shield</span>
                <span className="truncate font-code-telemetry text-code-telemetry">{currentScene.quick}</span>
              </div>
              <button
                onClick={() => setSelectedKey('alpha')}
                className="px-1.5 py-0.5 bg-surface-container-highest text-primary font-code-telemetry text-code-telemetry rounded-DEFAULT flex items-center gap-0.5 hover:text-primary-container"
              >
                <span className="material-symbols-outlined text-[12px]">my_location</span>
                CENTER
              </button>
            </div>
          </div>
        </div>

        {/* Primary Scene Dossier Detail Card */}
        <div className="px-margin flex flex-col space-y-3">
          <div className="bg-surface-container-low rounded-xl p-4 shadow-md flex flex-col space-y-4 border border-outline-variant/20">
            {/* Card Header & Identifiers */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-DEFAULT bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold tracking-wider">
                    {currentScene.code}
                  </span>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    {currentScene.id}
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface pt-1">
                  {currentScene.name}
                </h2>
                <p className="font-code-telemetry text-code-telemetry text-primary">
                  {currentScene.coord}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-DEFAULT font-label-sm text-label-sm tracking-tight text-right flex items-center gap-1.5 ${currentScene.statusClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                {currentScene.statusPill}
              </span>
            </div>

            {/* Tactical Status Banner */}
            <div className="p-2.5 rounded-DEFAULT bg-surface-container text-on-surface font-code-telemetry text-code-telemetry flex items-start gap-2 border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0 mt-0.5">verified_user</span>
              <span>{currentScene.statusDesc}</span>
            </div>

            {/* Environmental Telemetry Matrix */}
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">thermostat</span>
                  Micro-Climate Telemetry
                </span>
                <span className="text-tertiary-fixed-dim font-code-telemetry text-code-telemetry">CALIBRATED</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-surface-container p-2 rounded-DEFAULT flex flex-col border border-outline-variant/20">
                  <span className="text-on-surface-variant font-code-telemetry text-code-telemetry">AMBIENT</span>
                  <span className="text-primary font-headline-sm text-headline-sm">{currentScene.temp}</span>
                  <span className="text-on-surface-variant font-code-telemetry text-[9px]">SURFACE: {currentScene.surfaceTemp}</span>
                </div>
                <div className="bg-surface-container p-2 rounded-DEFAULT flex flex-col border border-outline-variant/20">
                  <span className="text-on-surface-variant font-code-telemetry text-code-telemetry">HUMIDITY</span>
                  <span className="text-primary font-headline-sm text-headline-sm">{currentScene.humidity}</span>
                  <span className="text-on-surface-variant font-code-telemetry text-[9px]">DEW POINT: {currentScene.dewPoint}</span>
                </div>
                <div className="bg-surface-container p-2 rounded-DEFAULT flex flex-col border border-outline-variant/20">
                  <span className="text-on-surface-variant font-code-telemetry text-code-telemetry">SURFACE WIND</span>
                  <span className="text-primary font-headline-sm text-headline-sm">{currentScene.wind}</span>
                  <span className="text-on-surface-variant font-code-telemetry text-[9px]">VECTOR: {currentScene.windVector}</span>
                </div>
              </div>
            </div>

            {/* Evidence Inventory Summary Bar */}
            <div className="bg-surface-container p-3 rounded-lg flex flex-col space-y-2 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">inventory_2</span>
                  Logged On-Site Artifacts
                </span>
                <span className="font-code-telemetry text-code-telemetry text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded-DEFAULT">
                  {currentScene.evidenceText}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentScene.evidenceTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-DEFAULT bg-surface-container-highest text-on-surface font-code-telemetry text-code-telemetry">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 font-code-telemetry text-code-telemetry text-on-surface-variant border-t border-surface-container-high/60">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">360</span>
                  <span>{currentScene.spheres}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">view_in_ar</span>
                  <span>{currentScene.lidar}</span>
                </div>
              </div>
            </div>

            {/* Personnel in Charge */}
            <div className="flex items-center justify-between bg-surface-container-lowest p-2.5 rounded-DEFAULT border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-primary-container/40"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq3J6mKbhqC7AQWs3L3iwWXmsbc8MlTlzybDRcqfkHmR2n23i_nx18uvoHrBDWGNzA7P5JYyovokyNYkNftaxXHdKJ6la0Se1nONUQT29ymFJ0KoEdwOAfi5zwkjjPC70HSKsdp_IbrtWbQgw0R2-VowN4lg23YTg3OEPbd-pVvkhtAKnqU-C8Wo_azrvOi1FQybBqmTXAN2C0jPfIMh2_urrrbxym9utB5s4M6Gw"
                  alt={currentScene.lead}
                />
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface font-medium leading-none">
                    {currentScene.lead}
                  </span>
                  <span className="font-code-telemetry text-code-telemetry text-on-surface-variant">
                    {currentScene.unit}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleActionToast(`Secured comm channel open to ${currentScene.lead}`)}
                className="w-8 h-8 rounded flex items-center justify-center text-primary-container hover:bg-surface-container-high"
                title="Dispatch Direct Comms"
              >
                <span className="material-symbols-outlined text-[18px]">contact_phone</span>
              </button>
            </div>

            {/* Action Buttons Grid */}
            <div className="flex flex-col space-y-2 pt-1">
              <button
                onClick={() => setShowMeshModal(true)}
                className="w-full py-2.5 rounded-DEFAULT bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,229,255,0.3)] active:scale-[0.98] transition-transform hover:brightness-110"
              >
                <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                Inspect 3D Scene Mesh
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleActionToast('Courier dispatch initiated for collected artifacts.')}
                  className="py-2 px-3 rounded-DEFAULT bg-secondary-container text-on-secondary-container font-label-md text-label-md font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform hover:brightness-110"
                >
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Courier
                </button>
                <button
                  onClick={() => handleActionToast('Field log record encrypted and synchronized.')}
                  className="py-2 px-3 rounded-DEFAULT bg-surface-container-highest text-primary font-label-md text-label-md font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform hover:text-primary-container border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[16px]">assignment</span>
                  Field Log
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Realtime Geo-Telemetry Feed Card */}
        <div className="px-margin flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-primary">Field Recon Telemetry</span>
            <span className="font-code-telemetry text-code-telemetry text-tertiary-fixed-dim">UPDATED 14s AGO</span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-3 space-y-2.5 border border-outline-variant/20">
            <div className="flex items-center justify-between text-body-sm font-body-sm bg-surface-container px-2.5 py-1.5 rounded-DEFAULT">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="text-on-surface truncate">Transit: Van #CSI-08 en-route Central Lab</span>
              </div>
              <span className="font-code-telemetry text-code-telemetry text-primary shrink-0">ETA 08m</span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm bg-surface-container px-2.5 py-1.5 rounded-DEFAULT">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                <span className="text-on-surface truncate">Perimeter Sensor #P-04 Triggered (Low)</span>
              </div>
              <span className="font-code-telemetry text-code-telemetry text-tertiary-fixed-dim shrink-0">CHECKED</span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm bg-surface-container px-2.5 py-1.5 rounded-DEFAULT">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                <span className="text-on-surface truncate">Drone LiDAR Point-Cloud Processing</span>
              </div>
              <span className="font-code-telemetry text-code-telemetry text-secondary shrink-0">84%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene Mesh Inspection Modal */}
      {showMeshModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-surface-container-low rounded-2xl p-6 border border-primary-container/40 shadow-[0_0_32px_rgba(0,229,255,0.3)] flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">view_in_ar</span>
                <h3 className="font-headline-sm text-primary">LiDAR 3D Mesh Inspection</h3>
              </div>
              <button
                onClick={() => setShowMeshModal(false)}
                className="text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative w-full h-64 bg-surface-container-lowest rounded-xl flex items-center justify-center border border-primary-container/20 overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00daf3_1px,transparent_1px)] [background-size:12px_12px]"></div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center p-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary-container animate-spin flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px] text-primary-container">3d_rotation</span>
                </div>
                <span className="font-code-telemetry text-primary text-xs tracking-wider">
                  RENDERING {currentScene.code} POINT CLOUD
                </span>
                <span className="font-body-sm text-on-surface-variant text-xs">
                  Density: 1.4M points • LiDAR Class 1 • Coordinate system: WGS84
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 font-code-telemetry text-xs">
              <div className="bg-surface-container p-2 rounded">
                <span className="text-on-surface-variant">VOLUMETRIC:</span>
                <span className="text-primary block">348.6 m³</span>
              </div>
              <div className="bg-surface-container p-2 rounded">
                <span className="text-on-surface-variant">CONFIDENCE:</span>
                <span className="text-primary block">99.94%</span>
              </div>
            </div>

            <button
              onClick={() => setShowMeshModal(false)}
              className="w-full py-2.5 bg-primary-container text-on-primary-container font-headline-sm uppercase tracking-wider rounded-lg"
            >
              Close Mesh Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

