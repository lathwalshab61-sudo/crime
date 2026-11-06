# CrimeScene Hub - Backend API (Node.js + Express)

Robust, RESTful backend for the CrimeScene Hub Forensics & Telemetry platform, built with Node.js and Express.

---

## 📁 Architecture & File Structure

```
backend/
├── .env                                 # Environment variables (PORT=5000, CLIENT_URL)
├── package.json                         # Dependencies (express, cors, morgan, dotenv)
├── server.js                            # HTTP server initialization
├── test-api.js                          # Integration test runner for all endpoints
└── src/
    ├── app.js                           # Express application & route mounting
    ├── controllers/
    │   ├── caseController.js            # Cases/dossiers CRUD and status queries
    │   ├── evidenceController.js        # Evidence intake & cryptographic ledger queries
    │   ├── locationController.js        # LiDAR crime scene locations & micro-climate data
    │   ├── labController.js             # AFIS, DNA STR, Serology trajectory & Disk verify
    │   ├── telemetryController.js       # Live KPI telemetry, block hashes & system logs
    │   └── reportController.js          # Cryptographic PDF/JSON forensic dossier generator
    ├── routes/
    │   ├── caseRoutes.js                # /api/cases
    │   ├── evidenceRoutes.js            # /api/evidence
    │   ├── locationRoutes.js            # /api/locations
    │   ├── labRoutes.js                 # /api/lab
    │   ├── telemetryRoutes.js           # /api/telemetry
    │   └── reportRoutes.js              # /api/reports
    ├── data/
    │   ├── seedData.js                  # Realistic baseline forensic cases & benchmarks
    │   ├── store.js                     # In-memory store with automatic JSON persistence
    │   └── database.json                # Local database file auto-persisted on disk
    ├── middleware/
    │   └── errorHandler.js              # Centralized error handler
    └── utils/
        └── cryptoUtil.js                # Real SHA-256 and SHA-512 custody hash generation
```

---

## 🔌 API Endpoints Reference

### 1. Health & Status
- `GET /api/health` - Terminal status, accreditation, and server uptime.

### 2. Cases & Dossiers (`/api/cases`)
- `GET /api/cases` - List all cases (optional filter by category: `?category=Homicide`).
- `GET /api/cases/:id` - Fetch single case by ID (e.g., `CR-2024-912`).
- `POST /api/cases` - Register a new case dossier.

### 3. Evidence Vault & Chain of Custody (`/api/evidence`)
- `GET /api/evidence` - List evidence items with search (`?search=9mm`) and filter (`?category=Ballistics`).
- `GET /api/evidence/:tag` - Fetch evidence item by tag (e.g., `TAG-0824`).
- `POST /api/evidence` - Log new evidence item (auto-generates genuine SHA-256 hash and digital chain-of-custody signature).

### 4. Tactical Geo-Tracker (`/api/locations`)
- `GET /api/locations` - Fetch all scenes (Alpha-1, Bravo-2, Charlie-3) with sensor coordinates and micro-climate metrics.
- `GET /api/locations/:key` - Fetch single scene by key.
- `PATCH /api/locations/:key` - Update scene status (e.g. LiDAR scan progress, perimeter state).

### 5. Forensic Laboratory Instrumentation (`/api/lab`)
- `POST /api/lab/afis/scan` - Execute AFIS minutiae extraction simulation with match coincidence.
- `POST /api/lab/dna/audit` - Audit 24-loci capillary electrophoresis and Amelogenin gender markers against CODIS.
- `POST /api/lab/serology/trajectory` - Calculate bloodstain impact angle $\theta = \arcsin(W/L)$ and 3D convergent origin coordinates.
- `POST /api/lab/documents/spectral` - VSC 8000 multi-spectral infrared absorption analysis.
- `POST /api/lab/digital/verify` - Hardware write-blocked SHA-256 disk image verification.

### 6. Telemetry & KPIs (`/api/telemetry`)
- `GET /api/telemetry/kpi` - Active cases, evidence log counts, match rates, and turnaround times.
- `GET /api/telemetry/live` - Current cryptographic block, satellite link status, and live dispatch ticker.
- `GET /api/telemetry/logs` - Real-time terminal telemetry logs.
- `POST /api/telemetry/logs` - Append an entry to the live telemetry stream.

### 7. Official Reports (`/api/reports`)
- `POST /api/reports/generate` - Generate an ISO/IEC 17025 accredited Forensic Report Dossier signed with SHA-512.

---

## 🚀 How to Run the Backend

From the `backend` directory:

### Run in Development Mode (with auto-reload):
```bash
npm run dev
```

### Run in Standard Production Mode:
```bash
npm start
```
The server will start at **`http://localhost:5000`**.

### Run Test Suite:
```bash
node test-api.js
```

