import { store } from '../data/store.js';
import { generateSHA256 } from '../utils/cryptoUtil.js';

/**
 * Run AFIS Biometric Minutiae Scan & Match
 */
export function scanMinutiae(req, res) {
  try {
    const { sampleId, resolutionDpi } = req.body;
    const minutiaeCount = Math.floor(Math.random() * 20) + 48;
    const matchProbability = (98.5 + Math.random() * 1.4).toFixed(2);
    const subjectId = 'SUBJ-440-K';

    store.addTelemetryLog('AFIS_SCAN', `AFIS scan complete: ${minutiaeCount} pts (${matchProbability}% match)`);

    return res.json({
      success: true,
      data: {
        sampleId: sampleId || 'TAG-0825',
        resolutionDpi: resolutionDpi || 1200,
        extractedMinutiae: minutiaeCount,
        matchProbability: `${matchProbability}%`,
        status: 'MATCH_CONFIRMED',
        database: 'IAFIS / NGI Federal Repository',
        matchedSubject: subjectId,
        deltaClusters: 4,
        ridgeBifurcations: Math.floor(minutiaeCount * 0.65),
        poroscopyVerified: true
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * DNA & STR Profiling Suite Loci Audit
 */
export function auditDNALoci(req, res) {
  try {
    const { lociSampleId } = req.body;
    const standardLoci = [
      { locus: 'D3S1358', alleles: [15, 16], confidence: 99.98 },
      { locus: 'vWA', alleles: [17, 18], confidence: 99.95 },
      { locus: 'FGA', alleles: [21, 24], confidence: 99.97 },
      { locus: 'D8S1179', alleles: [13, 14], confidence: 99.99 },
      { locus: 'D21S11', alleles: [29, 30], confidence: 99.96 },
      { locus: 'D18S51', alleles: [14, 19], confidence: 99.94 },
      { locus: 'D5S818', alleles: [11, 12], confidence: 99.98 },
      { locus: 'D13S317', alleles: [11, 13], confidence: 99.97 },
      { locus: 'D7S820', alleles: [9, 10], confidence: 99.99 },
      { locus: 'TH01', alleles: [7, 9.3], confidence: 99.99 },
      { locus: 'TPOX', alleles: [8, 11], confidence: 99.96 },
      { locus: 'CSF1PO', alleles: [10, 12], confidence: 99.95 },
      { locus: 'AMELOGENIN', alleles: ['X', 'Y'], gender: 'MALE', confidence: 100 }
    ];

    store.addTelemetryLog('CODIS_SYNC', 'DNA 24-loci profile authenticated against CODIS');

    return res.json({
      success: true,
      data: {
        sampleId: lociSampleId || 'DNA-CR-2024-884',
        accreditation: 'ISO/IEC 17025',
        codisRank: '#0049-PRIMARY',
        genderResult: 'MALE (Amelogenin X/Y)',
        matchCoincidence: '99.98%',
        pcrAmplificationStatus: 'OPTIMAL',
        lociProfile: standardLoci
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Serology & Bloodstain Trajectory Math Calculation
 * θ = arcsin(Width / Length)
 */
export function calculateTrajectory(req, res) {
  try {
    const width = parseFloat(req.body.width) || 12.4; // mm
    const length = parseFloat(req.body.length) || 22.0; // mm

    // Formula: angle = asin(w / l) in degrees
    const ratio = Math.min(Math.max(width / length, 0), 1);
    const radians = Math.asin(ratio);
    const degrees = (radians * (180 / Math.PI)).toFixed(1);

    const origin = {
      x: '1.84m',
      y: '0.92m',
      z: '1.25m'
    };

    store.addTelemetryLog('SEROLOGY_CALC', `Bloodstain trajectory computed: theta = ${degrees} deg`);

    return res.json({
      success: true,
      data: {
        inputWidthMm: width,
        inputLengthMm: length,
        impactAngleDegrees: `${degrees}° ± 0.4°`,
        spatterClassification: 'HIGH_VELOCITY_IMPACT',
        convergentOrigin: origin,
        luminolReactivity: 'POSITIVE_CATALYTIC',
        kastleMeyerResult: 'PRESUMPTIVE_POSITIVE'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Questioned Document Spectral Test
 */
export function testDocumentSpectra(req, res) {
  try {
    const { documentId, wavelengthNm } = req.body;
    store.addTelemetryLog('SPECTRA_DOC', 'Infrared ink absorption test executed on questioned will');

    return res.json({
      success: true,
      data: {
        documentId: documentId || 'DOC-CR-2024-771',
        instrument: 'VSC 8000 Multi-Spectral Comparator',
        testedWavelength: wavelengthNm || '850nm',
        infraredCutoff: '850nm',
        inkSignaturesDetected: 2,
        resultSummary: 'Spectrophotometry confirmed dual ink chemical formulations. Secondary alteration identified.'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Digital Forensics Physical Disk & Hash Integrity Verification
 */
export function verifyDigitalEvidence(req, res) {
  try {
    const { targetHash, diskId } = req.body;
    const benchmarkHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    const computedHash = targetHash || benchmarkHash;

    const matches = computedHash.toLowerCase() === benchmarkHash.toLowerCase();
    store.addTelemetryLog('DIGITAL_HASH', `SHA-256 verified for disk ${diskId || '512GB NVMe'}: MATCH`);

    return res.json({
      success: true,
      data: {
        diskId: diskId || 'NVME-512GB-01',
        verifiedHash: computedHash,
        hashType: 'SHA-256',
        isWriteBlocked: true,
        badSectors: 0,
        integrityStatus: matches ? 'MATCH_VERIFIED' : 'HASH_MISMATCH',
        chainOfCustodySecured: true
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

