const PrescriptionService = require('../services/prescription.service');
exports.createPrescriptionController = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      medication,
      dosage,
      frequency,
      duration,
      notes
    } = req.body;

    const prescription = {
      prescriptionId: `PR${Date.now()}`,  // auto-generated ID
      recordId: `MR${Date.now()}`,        // example medical record ID
      medication,
      dosage,
      frequency,
      duration,
      notes,
      prescribedBy: doctorId,
      date: new Date().toISOString()
    };

    const created = await PrescriptionService.createPrescription(prescription);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllPrescriptionsController = async (req, res) => {
  try {
    const prescriptions = await PrescriptionService.getAllPrescriptions();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPrescriptionByIdController = async (req, res) => {
  try {
    const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Not found' });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePrescriptionController = async (req, res) => {
  try {
    const updated = await PrescriptionService.updatePrescription(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePrescriptionController = async (req, res) => {
  try {
    await PrescriptionService.deletePrescription(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};