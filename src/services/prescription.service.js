const { getDb } = require('../config/db');

const createPrescription = async (data) => {
  const db = getDb();
  const query = `
    INSERT INTO Prescription SET 
      prescriptionId = :prescriptionId,
      recordId = :recordId,
      medication = :medication,
      dosage = :dosage,
      frequency = :frequency,
      prescribedBy = :prescribedBy,
      date = :date
  `;
  return await db.command(query, { params: data }).one();
};

const getAllPrescriptions = async () => {
  const db = getDb();
  return await db.query('SELECT FROM Prescription').all();
};

const getPrescriptionById = async (id) => {
  const db = getDb();
  const query = 'SELECT FROM Prescription WHERE prescriptionId = :prescriptionId';
  return await db.query(query, { params: { prescriptionId: id } }).one();
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
  return await db.command(query, { params: { ...data, prescriptionId: id } }).one();
};

const deletePrescription = async (id) => {
  const db = getDb();
  const query = 'DELETE VERTEX Prescription WHERE prescriptionId = :prescriptionId';
  return await db.command(query, { params: { prescriptionId: id } }).all();
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
};
