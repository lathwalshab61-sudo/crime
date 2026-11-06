const API_BASE = '/api';

/**
 * Universal safe fetcher with fallback support
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API] Fallback for ${endpoint}:`, error.message);
    return null;
  }
}

// Health check
export async function getHealth() {
  return await apiRequest('/health');
}

// Cases
export async function getCases(category) {
  const query = category && !category.startsWith('All') ? `?category=${encodeURIComponent(category)}` : '';
  const result = await apiRequest(`/cases${query}`);
  return result?.data || null;
}

export async function getCase(id) {
  const result = await apiRequest(`/cases/${encodeURIComponent(id)}`);
  return result?.data || null;
}

// Evidence
export async function getEvidence(category, search) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);
  const query = params.toString() ? `?${params.toString()}` : '';
  const result = await apiRequest(`/evidence${query}`);
  return result?.data || null;
}

export async function createEvidence(evidenceData) {
  const result = await apiRequest('/evidence', {
    method: 'POST',
    body: JSON.stringify(evidenceData),
  });
  return result?.data || null;
}

// Locations
export async function getLocations() {
  const result = await apiRequest('/locations');
  return result?.data || null;
}

export async function getLocation(key) {
  const result = await apiRequest(`/locations/${key}`);
  return result?.data || null;
}

// Telemetry & KPIs
export async function getKPIs() {
  const result = await apiRequest('/telemetry/kpi');
  return result?.data || null;
}

export async function getLiveTelemetry() {
  const result = await apiRequest('/telemetry/live');
  return result?.data || null;
}

export async function getTelemetryLogs() {
  const result = await apiRequest('/telemetry/logs');
  return result?.data || null;
}

export async function postTelemetryLog(tag, text) {
  const result = await apiRequest('/telemetry/logs', {
    method: 'POST',
    body: JSON.stringify({ tag, text }),
  });
  return result?.data || null;
}

// Forensic Lab Analyses
export async function runAFISScan(sampleId) {
  const result = await apiRequest('/lab/afis/scan', {
    method: 'POST',
    body: JSON.stringify({ sampleId }),
  });
  return result?.data || null;
}

export async function auditDNALoci(lociSampleId) {
  const result = await apiRequest('/lab/dna/audit', {
    method: 'POST',
    body: JSON.stringify({ lociSampleId }),
  });
  return result?.data || null;
}

export async function calculateTrajectory(width, length) {
  const result = await apiRequest('/lab/serology/trajectory', {
    method: 'POST',
    body: JSON.stringify({ width, length }),
  });
  return result?.data || null;
}

export async function testDocumentSpectra(documentId, wavelengthNm) {
  const result = await apiRequest('/lab/documents/spectral', {
    method: 'POST',
    body: JSON.stringify({ documentId, wavelengthNm }),
  });
  return result?.data || null;
}

export async function verifyDigitalEvidence(targetHash, diskId) {
  const result = await apiRequest('/lab/digital/verify', {
    method: 'POST',
    body: JSON.stringify({ targetHash, diskId }),
  });
  return result?.data || null;
}

// Reports
export async function generateForensicReport(caseId) {
  const result = await apiRequest('/reports/generate', {
    method: 'POST',
    body: JSON.stringify({ caseId }),
  });
  return result?.data || null;
}

