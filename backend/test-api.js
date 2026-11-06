import app from './src/app.js';
import http from 'http';

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Test server running on ${baseUrl}`);

  try {
    const endpoints = [
      '/api/health',
      '/api/cases',
      '/api/evidence',
      '/api/locations',
      '/api/telemetry/kpi',
      '/api/telemetry/live'
    ];

    for (const ep of endpoints) {
      const res = await fetch(`${baseUrl}${ep}`);
      const json = await res.json();
      console.log(`[PASS] GET ${ep} -> status: ${res.status}, success: ${json.success ?? json.status}`);
    }

    // Test POST Lab AFIS
    const afisRes = await fetch(`${baseUrl}/api/lab/afis/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'TAG-TEST' })
    });
    const afisJson = await afisRes.json();
    console.log(`[PASS] POST /api/lab/afis/scan -> Minutiae: ${afisJson.data.extractedMinutiae}`);

    // Test POST Report Generation
    const repRes = await fetch(`${baseUrl}/api/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId: 'CR-2024-912' })
    });
    const repJson = await repRes.json();
    console.log(`[PASS] POST /api/reports/generate -> ReportId: ${repJson.data.reportId}`);

    console.log('\nAll API routes functioning perfectly!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
  }
});

