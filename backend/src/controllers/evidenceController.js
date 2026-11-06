import { store } from '../data/store.js';

export function getAllEvidence(req, res) {
  try {
    const { category, search } = req.query;
    const items = store.getEvidence(category, search);
    return res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getEvidenceByTag(req, res) {
  try {
    const { tag } = req.params;
    const item = store.getEvidenceByTag(tag);
    if (!item) {
      return res.status(404).json({ success: false, message: `Evidence tag ${tag} not found.` });
    }
    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function logNewEvidence(req, res) {
  try {
    const { name, category, location, caseId, notes, collectedBy } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Evidence name is required.'
      });
    }

    const created = store.addEvidence({
      name: name.trim(),
      category: category || 'Ballistics',
      location: location || 'Intake Vault // Shelf A-1',
      caseId: caseId || 'CR-2024-912',
      notes,
      collectedBy: collectedBy || 'Investigating Officer'
    });

    return res.status(201).json({
      success: true,
      message: 'Evidence item signed and logged with cryptographic integrity.',
      data: created
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

