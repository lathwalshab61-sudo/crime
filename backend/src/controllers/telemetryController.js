import { store } from '../data/store.js';

export function getKPIStats(req, res) {
  try {
    const kpis = store.getKPIs();
    return res.json({ success: true, data: kpis });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getLiveTelemetry(req, res) {
  try {
    const hashes = [
      'BLK-99824 // LAT: 42.3601',
      'BLK-99825 // SEC: CRYPTO-NODE',
      'BLK-99826 // CODIS-BATCH 14',
      'BLK-99827 // GC-MS CHROMATOGRAPHY',
      'BLK-99828 // STRAT-ANALYZER OK'
    ];
    const randomIndex = Math.floor(Math.random() * hashes.length);

    return res.json({
      success: true,
      data: {
        currentBlock: hashes[randomIndex],
        terminalStatus: 'ONLINE',
        department: '#09',
        gpsGrid: '40.7128° N, 74.0060° W',
        satLink: 'LOCK-9 (99.8%)',
        codisQueue: '4 BATCHES',
        afisSamples: '128 LIDS',
        ramArmored: 'SECURE',
        dispatchAlert: {
          tag: 'DISPATCH',
          caseId: 'CR-2024-884',
          text: 'Cold Case #CR-2024-884 Reopened: DNA Phenotyping Match 94.6%',
          status: 'LIVE'
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getTelemetryLogs(req, res) {
  try {
    const logs = store.getTelemetryLogs();
    return res.json({ success: true, data: logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function postTelemetryLog(req, res) {
  try {
    const { tag, text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Log text is required.' });
    }
    const log = store.addTelemetryLog(tag || 'LIVE_EXEC', text);
    return res.status(201).json({ success: true, data: log });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

