import { store } from '../data/store.js';
import { generateCustodySignature } from '../utils/cryptoUtil.js';

export function generateForensicReport(req, res) {
  try {
    const { caseId } = req.body;
    const targetCase = caseId ? store.getCaseById(caseId) : store.getCases()[0];

    const relatedEvidence = store.getEvidence().filter((e) => !caseId || e.caseId === targetCase.id);

    const reportDossier = {
      reportId: `REP-ISO-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      accreditation: 'ISO/IEC 17025 Accredited Forensic Laboratory',
      jurisdiction: 'Metropolitan Criminology & Forensics Division',
      case: targetCase,
      evidenceItemsCount: relatedEvidence.length,
      evidenceSummary: relatedEvidence,
      cryptographicSignature: generateCustodySignature({ caseId: targetCase.id, count: relatedEvidence.length }),
      hashStandard: 'SHA-512 Signed Digest',
      status: 'VERIFIED_OFFICIAL'
    };

    store.addTelemetryLog('REPORT_GEN', `Forensic dossier ${reportDossier.reportId} generated for ${targetCase.id}`);

    return res.json({
      success: true,
      message: 'Cryptographically signed Forensic Report successfully compiled.',
      data: reportDossier
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

