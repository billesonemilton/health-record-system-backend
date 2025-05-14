const {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
} = require('../services/prescription.service');

const createPrescriptionController = async (req, res) => {
  try {
    const prescription = await createPrescription(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
};

const getAllPrescriptionsController = async (req, res) => {
  try {
    const prescriptions = await getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prescriptions' });
  }
};

const getPrescriptionByIdController = async (req, res) => {
  try {
    const prescription = await getPrescriptionById(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prescription' });
  }
};

const updatePrescriptionController = async (req, res) => {
  try {
    const updated = await updatePrescription(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update prescription' });
  }
};

const deletePrescriptionController = async (req, res) => {
  try {
    await deletePrescription(req.params.id);
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
};

module.exports = {
  createPrescriptionController,
  getAllPrescriptionsController,
  getPrescriptionByIdController,
  updatePrescriptionController,
  deletePrescriptionController
};
