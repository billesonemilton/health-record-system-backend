const systemAdminService = require('../services/systemAdmin.service');

const createSystemAdmin = async (req, res) => {
  try {
    const result = await systemAdminService.createSystemAdmin(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSystemAdmins = async (req, res) => {
  try {
    const result = await systemAdminService.getAllSystemAdmins();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSystemAdminById = async (req, res) => {
  try {
    const result = await systemAdminService.getSystemAdminById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSystemAdmin = async (req, res) => {
  try {
    const result = await systemAdminService.updateSystemAdmin(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSystemAdmin = async (req, res) => {
  try {
    await systemAdminService.deleteSystemAdmin(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSystemAdmin,
  getAllSystemAdmins,
  getSystemAdminById,
  updateSystemAdmin,
  deleteSystemAdmin,
};
