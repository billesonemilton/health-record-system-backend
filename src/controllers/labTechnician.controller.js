const labTechnicianService = require('../services/labTechnician.service');

const createLabTechnician = async (req, res) => {
  try {
    const result = await labTechnicianService.createLabTechnician(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllLabTechnicians = async (req, res) => {
  try {
    const result = await labTechnicianService.getAllLabTechnicians();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLabTechnicianById = async (req, res) => {
  try {
    const result = await labTechnicianService.getLabTechnicianById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLabTechnician = async (req, res) => {
  try {
    const result = await labTechnicianService.updateLabTechnician(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLabTechnician = async (req, res) => {
  try {
    await labTechnicianService.deleteLabTechnician(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLabTechnician,
  getAllLabTechnicians,
  getLabTechnicianById,
  updateLabTechnician,
  deleteLabTechnician,
};
