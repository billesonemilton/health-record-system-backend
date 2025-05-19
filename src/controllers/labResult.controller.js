const LabResultService = require('../services/labResult.service');

exports.create = async (req, res) => {
  try {
    const result = await LabResultService.createLabResult(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const results = await LabResultService.getAllLabResults();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await LabResultService.getLabResultById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Lab result not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await LabResultService.updateLabResult(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await LabResultService.deleteLabResult(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
