import { store } from '../data/store.js';

export function getAllCases(req, res) {
  try {
    const { category } = req.query;
    const cases = store.getCases(category);
    return res.json({
      success: true,
      count: cases.length,
      data: cases
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getCaseById(req, res) {
  try {
    const { id } = req.params;
    const found = store.getCaseById(id);
    if (!found) {
      return res.status(404).json({ success: false, message: `Case ${id} not found.` });
    }
    return res.json({ success: true, data: found });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function createCase(req, res) {
  try {
    const { title, desc, category, lead, filterCategory } = req.body;
    if (!title || !desc) {
      return res.status(400).json({
        success: false,
        message: 'Case title and description are required.'
      });
    }

    const created = store.addCase({
      title,
      desc,
      category,
      lead,
      filterCategory
    });

    return res.status(201).json({
      success: true,
      message: 'New forensic case registered successfully.',
      data: created
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

