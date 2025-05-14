const { getDb } = require('../config/db');

const createMedicalRecord = async (data) => {
  const db = getDb();
  const query = `
    INSERT INTO MedicalRecord CONTENT {
      recordId: :recordId,
      citizenId: :citizenId,
      providerId: :providerId,
      visitDate: :visitDate,
      diagnosis: :diagnosis,
      treatment: :treatment,
      notes: :notes
    }
  `;
  const params = {
    params: {
      recordId: data.recordId,
      citizenId: data.citizenId,
      providerId: data.providerId,
      visitDate: data.visitDate,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      notes: data.notes || ''
    }
  };
  const result = await db.command(query, params).all();
  return result[0];
};

const getAllMedicalRecords = async () => {
  const db = getDb();
  const result = await db.command('SELECT * FROM MedicalRecord').all();
  return result;
};

const getMedicalRecordById = async (id) => {
  const db = getDb();
  const query = 'SELECT * FROM MedicalRecord WHERE recordId = :recordId';
  const params = { params: { recordId: id } };
  const result = await db.command(query, params).all();
  return result[0];
};

const updateMedicalRecord = async (id, data) => {
  const db = getDb();
  const query = `
    UPDATE MedicalRecord SET
      citizenId = :citizenId,
      providerId = :providerId,
      visitDate = :visitDate,
      diagnosis = :diagnosis,
      treatment = :treatment,
      notes = :notes
    WHERE recordId = :recordId
  `;
  const params = {
    params: {
      recordId: id,
      citizenId: data.citizenId,
      providerId: data.providerId,
      visitDate: data.visitDate,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      notes: data.notes || ''
    }
  };
  const result = await db.command(query, params).all();
  return result[0];
};

const deleteMedicalRecord = async (id) => {
  const db = getDb();
  const query = 'DELETE VERTEX MedicalRecord WHERE recordId = :recordId';
  const params = { params: { recordId: id } };
  await db.command(query, params).all();
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
};
