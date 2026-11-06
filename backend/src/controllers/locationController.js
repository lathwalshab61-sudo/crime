import { store } from '../data/store.js';

export function getAllLocations(req, res) {
  try {
    const locations = store.getLocations();
    return res.json({ success: true, data: locations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getLocationByKey(req, res) {
  try {
    const { key } = req.params;
    const location = store.getLocation(key.toLowerCase());
    if (!location) {
      return res.status(404).json({ success: false, message: `Scene key '${key}' not found.` });
    }
    return res.json({ success: true, data: location });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function updateLocation(req, res) {
  try {
    const { key } = req.params;
    const updated = store.updateLocationStatus(key.toLowerCase(), req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Scene key '${key}' not found.` });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

