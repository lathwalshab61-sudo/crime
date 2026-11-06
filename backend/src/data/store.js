import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedCases, seedEvidence, seedLocations, seedKPIs } from './seedData.js';
import { generateSHA256, generateCustodySignature } from '../utils/cryptoUtil.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

class DataStore {
  constructor() {
    this.cases = [];
    this.evidence = [];
    this.locations = {};
    this.kpis = {};
    this.telemetryLogs = [];
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.cases = data.cases || [...seedCases];
        this.evidence = data.evidence || [...seedEvidence];
        this.locations = data.locations || { ...seedLocations };
        this.kpis = data.kpis || { ...seedKPIs };
        this.telemetryLogs = data.telemetryLogs || this.getDefaultLogs();
        return;
      }
    } catch (err) {
      console.warn('Could not read existing database.json, seeding fresh data.', err.message);
    }

    this.cases = [...seedCases];
    this.evidence = [...seedEvidence];
    this.locations = { ...seedLocations };
    this.kpis = { ...seedKPIs };
    this.telemetryLogs = this.getDefaultLogs();
    this.save();
  }

  getDefaultLogs() {
    return [
      { id: 1, tag: 'AUTH', text: 'Terminal unlocked by badge #CS-9042', time: '10:32:01' },
      { id: 2, tag: 'AFIS', text: 'Latent print vector matched with CODIS record', time: '10:33:14' },
      { id: 3, tag: 'SPECTRA', text: '785nm Raman analysis: Synthetic accelerant detected', time: '10:35:40' }
    ];
  }

  save() {
    try {
      const payload = {
        cases: this.cases,
        evidence: this.evidence,
        locations: this.locations,
        kpis: this.kpis,
        telemetryLogs: this.telemetryLogs
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database.json:', err.message);
    }
  }

  // --- Cases ---
  getCases(filterCategory) {
    if (!filterCategory || filterCategory.toLowerCase().startsWith('all')) {
      return this.cases;
    }
    return this.cases.filter(
      (c) =>
        c.filterCategory.toLowerCase() === filterCategory.toLowerCase() ||
        c.category.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }

  getCaseById(id) {
    return this.cases.find((c) => c.id.toLowerCase() === id.toLowerCase());
  }

  addCase(caseData) {
    const newCase = {
      id: caseData.id || `CR-2024-${Math.floor(100 + Math.random() * 900)}`,
      tag: caseData.tag || `TAG-${Math.floor(100 + Math.random() * 900)}`,
      time: 'JUST NOW',
      title: caseData.title,
      desc: caseData.desc,
      lead: caseData.lead || 'Investigator Unit',
      category: caseData.category || 'General',
      filterCategory: caseData.filterCategory || 'Homicide',
      status: 'ACTIVE',
      badge: caseData.badge || 'New Intake',
      badgeColor: 'text-primary-container',
      image: caseData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1swiQ_1m6AVxBTUlWokZ8gPCBEcTIgrf-4qiwNVR-22nKoqIcZl67uG9ZQqxNYIV_31CJTo_gqVrqUk5eMq3L2jJSLd4qSM5Y8dYP3G7zdPnstFwWyZ11PzKWUpNQrzebl7Yjvo0FDUnxmEeTbk_fW4ffS4kAu75G-nN1gOVUu2fWUN02obbhWbRettRX6jMgZjkiBZbROa4Gf0dw_DgY7CLObt_a3gY9Ab2z9t8',
      dateLogged: new Date().toISOString(),
      evidenceCount: 0
    };
    this.cases.unshift(newCase);
    this.kpis.activeCases.value += 1;
    this.addTelemetryLog('CASE_OPEN', `New case opened: #${newCase.id} [${newCase.title}]`);
    this.save();
    return newCase;
  }

  // --- Evidence ---
  getEvidence(category, search) {
    let result = [...this.evidence];
    if (category && category !== 'All') {
      result = result.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.caseId.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q))
      );
    }
    return result;
  }

  getEvidenceByTag(tag) {
    return this.evidence.find((item) => item.tag.toLowerCase() === tag.toLowerCase());
  }

  addEvidence(item) {
    const nextNum = 824 + this.evidence.length;
    const tag = item.tag || `TAG-0${nextNum}`;
    const hash = '0x' + generateSHA256(item.name + tag + Date.now());
    const custodySignature = generateCustodySignature({ ...item, tag, hash });

    const newEvidence = {
      id: `EV-00${this.evidence.length + 1}`,
      tag,
      name: item.name,
      location: item.location || 'Central Forensics Intake // Room 102',
      caseId: item.caseId || 'CR-2024-912',
      status: 'Secured in Vault',
      statusType: 'secured',
      hash,
      custodySignature,
      category: item.category || 'General',
      collectedBy: item.collectedBy || 'Investigating Officer',
      collectedDate: new Date().toLocaleString(),
      notes: item.notes || 'Logged via Forensic Terminal with digital chain-of-custody guarantee.'
    };

    this.evidence.unshift(newEvidence);
    this.kpis.evidenceLogs.value += 1;
    this.addTelemetryLog('EVIDENCE_LOG', `Item logged: ${newEvidence.tag} (${newEvidence.name})`);
    this.save();
    return newEvidence;
  }

  // --- Locations ---
  getLocations() {
    return this.locations;
  }

  getLocation(key) {
    return this.locations[key];
  }

  updateLocationStatus(key, update) {
    if (this.locations[key]) {
      this.locations[key] = { ...this.locations[key], ...update };
      this.save();
      return this.locations[key];
    }
    return null;
  }

  // --- KPIs & Telemetry ---
  getKPIs() {
    return this.kpis;
  }

  getTelemetryLogs() {
    return this.telemetryLogs;
  }

  addTelemetryLog(tag, text) {
    const log = {
      id: Date.now(),
      tag,
      text,
      time: new Date().toLocaleTimeString()
    };
    this.telemetryLogs.unshift(log);
    if (this.telemetryLogs.length > 50) {
      this.telemetryLogs.pop();
    }
    this.save();
    return log;
  }
}

export const store = new DataStore();

