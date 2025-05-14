const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../services/medicalRecord.service');

const createMedicalRecordController = async (req, res) => {
  try {
    const record = await createMedicalRecord(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to create medical record' });
  }
};

const getAllMedicalRecordsController = async (req, res) => {
  try {
    const records = await getAllMedicalRecords();
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get records' });
  }
};

const getMedicalRecordByIdController = async (req, res) => {
  try {
    const record = await getMedicalRecordById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get record' });
  }
};

const updateMedicalRecordController = async (req, res) => {
  try {
    const updated = await updateMedicalRecord(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update record' });
  }
};

const deleteMedicalRecordController = async (req, res) => {
  try {
    await deleteMedicalRecord(req.params.id);
    res.status(200).json({ message: 'Record deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete record' });
  }
};

module.exports = {
  createMedicalRecordController,
  getAllMedicalRecordsController,
  getMedicalRecordByIdController,
  updateMedicalRecordController,
  deleteMedicalRecordController
};
