# CrimeScene Hub - Frontend (React + Vite + Tailwind CSS)

Professional full-stack ready React frontend converted from the Google Stitch forensic design prototypes located in `stitch_crimescene_hub_portal`.

## 📁 Architecture & Page Directory Structure

Each page from the Google Stitch designs has been converted into a dedicated, modular React component within its own folder inside `src/pages/`:

```
frontend/
├── index.html                           # Entry HTML with Space Grotesk, JetBrains Mono, Inter & Material Symbols
├── tailwind.config.js                   # Stitch theme design tokens (colors, typography, spacing, border radiuses)
├── vite.config.js                       # Vite bundler configuration
├── package.json                         # React 18, React Router v6, Tailwind CSS
└── src/
    ├── main.jsx                         # Application root mount
    ├── App.jsx                          # Router configuration & modal state management
    ├── index.css                        # Tailwind base directives & HUD style definitions
    ├── components/
    │   ├── Header.jsx                   # Fixed tactical header with status, title, search & notification triggers
    │   ├── BottomNav.jsx                # Fixed navigation tab bar linking all modules
    │   └── GlobalEvidenceModal.jsx      # Global search modal, telemetry alerts & evidence intake form
    └── pages/
        ├── Overview/                    # Converted from `home_every_evidence_tells_a_story/code.html`
        │   └── OverviewPage.jsx         # Live dispatch ticker, interactive biometric scanner, HUD metrics, modalities
        ├── Dashboard/                   # Converted from `investigation_dashboard_telemetry/code.html`
        │   └── DashboardPage.jsx        # Telemetry HUD, 2x2 KPI cards, sparklines, modality breakdown, case feed
        ├── ForensicLab/                 # Converted from `forensic_lab_instrumentation_suite/code.html`
        │   └── ForensicLabPage.jsx      # Virtual workbench, AFIS scanner, DNA STR gel visualizer, serology, cyber
        ├── Locations/                   # Converted from `crime_scene_locations_geo_tracker/code.html`
        │   └── LocationsPage.jsx        # Tactical Geo-tracker, interactive radar map with pins, scene dossiers, 3D mesh
        ├── Evidence/                    # Dedicated Evidence Vault
        │   └── EvidencePage.jsx         # Cryptographic chain-of-custody ledger, search & category filters
        └── More/                        # System & Settings
            └── MorePage.jsx             # Terminal configuration, personnel registry, ISO/IEC 17025 compliance
```

---

## 🚀 How to Run

### 1. Development Mode
From the `frontend` folder:
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### 2. Production Build
```bash
npm run build
```
Build output is generated into `frontend/dist/`.

---

## 🔬 Features & Micro-Interactions

- **Full Routing Support**: Navigate seamlessly between Overview (`/`), Dashboard (`/dashboard`), Lab (`/forensic-lab`), Locations (`/locations`), Evidence (`/evidence`), and Settings (`/more`).
- **Interactive Biometric Scanner**: Interactive reticle pulse with coordinate readouts on the Overview page.
- **AFIS Minutiae Extraction**: Interactive simulation on the Forensic Lab page with minutiae count calculation and coincidence ratings.
- **DNA STR Gel Visualization**: 24-loci capillary electrophoresis representation and Amelogenin audit.
- **Tactical Map Pin Toggles**: Click between Alpha-1, Bravo-2, and Charlie-3 on the Locations page to dynamically update the environmental matrix, personnel, and artifacts.
- **3D LiDAR Mesh Modal**: Interactive 3D scene point-cloud modal viewer.
- **Evidence Intake Form**: Interactive modal to log new evidence and sign with simulated cryptographic custody hashes.

