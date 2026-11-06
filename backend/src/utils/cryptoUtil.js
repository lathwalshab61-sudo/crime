import crypto from 'crypto';

/**
 * Generates an SHA-256 hash for evidence content or metadata
 * @param {string|object} data
 * @returns {string} hex encoded hash
 */
export function generateSHA256(data) {
  const content = typeof data === 'object' ? JSON.stringify(data) : String(data);
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Generates an SHA-512 custody signature for tamper-evident ledger logging
 * @param {object} ledgerRecord
 * @returns {string} hex encoded signature
 */
export function generateCustodySignature(ledgerRecord) {
  const recordString = JSON.stringify({
    ...ledgerRecord,
    timestamp: new Date().toISOString(),
    nonce: crypto.randomBytes(8).toString('hex')
  });
  return crypto.createHash('sha512').update(recordString).digest('hex');
}

/**
 * Verifies if a given hash matches expected SHA-256
 */
export function verifyHash(input, expectedHash) {
  const calculated = generateSHA256(input);
  return calculated.toLowerCase() === expectedHash.toLowerCase();
}

