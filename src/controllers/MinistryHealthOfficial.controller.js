const MinistryHealthOfficialService = require('../services/MinistryHealthOfficial.service');

exports.getAll = async (req, res) => {
  try {
    const officials = await MinistryHealthOfficialService.getAll();
    res.json(officials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const official = await MinistryHealthOfficialService.getById(req.params.id);
    if (!official) return res.status(404).json({ error: 'Not found' });
    res.json(official);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      officialId,
      fullName,
      position,
      email,
      phone,
      accessLevel
    } = req.body;

    if (!officialId || !fullName || !position || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOfficial = {
      officialId,
      fullName,
      position,
      email,
      phone: phone || '',
      accessLevel: accessLevel || 'standard' // default accessLevel
    };

    const created = await MinistryHealthOfficialService.create(newOfficial);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await MinistryHealthOfficialService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await MinistryHealthOfficialService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
