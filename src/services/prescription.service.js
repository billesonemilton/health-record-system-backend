const { getDb } = require('../config/db');

const createPrescription = async (data) => {
  const db = getDb();
  const query = `
    INSERT INTO Prescription CONTENT {
      prescriptionId: :prescriptionId,
      recordId: :recordId,
      medication: :medication,
      dosage: :dosage,
      frequency: :frequency,
      prescribedBy: :prescribedBy,
      date: :date
    }
  `;
  const params = {
    params: {
      prescriptionId: data.prescriptionId,
      recordId: data.recordId,
      medication: data.medication,
      dosage: data.dosage,
      frequency: data.frequency,
      prescribedBy: data.prescribedBy,
      date: data.date
    }
  };
  const result = await db.command(query, params).all();
  return result[0];
};

const getAllPrescriptions = async () => {
  const db = getDb();
  const result = await db.command('SELECT * FROM Prescription').all();
  return result;
};

const getPrescriptionById = async (id) => {
  const db = getDb();
  const query = 'SELECT * FROM Prescription WHERE prescriptionId = :prescriptionId';
  const params = { params: { prescriptionId: id } };
  const result = await db.command(query, params).all();
  return result[0];
};

const updatePrescription = async (id, data) => {
  const db = getDb();
  const query = `
    UPDATE Prescription SET
      recordId = :recordId,
      medication = :medication,
      dosage = :dosage,
      frequency = :frequency,
      prescribedBy = :prescribedBy,
      date = :date
    WHERE prescriptionId = :prescriptionId
  `;
  const params = {
    params: {
      prescriptionId: id,
      recordId: data.recordId,
      medication: data.medication,
      dosage: data.dosage,
      frequency: data.frequency,
      prescribedBy: data.prescribedBy,
      date: data.date
    }
  };
  const result = await db.command(query, params).all();
  return result[0];
};

const deletePrescription = async (id) => {
  const db = getDb();
  const query = 'DELETE VERTEX Prescription WHERE prescriptionId = :prescriptionId';
  const params = { params: { prescriptionId: id } };
  await db.command(query, params).all();
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
};
