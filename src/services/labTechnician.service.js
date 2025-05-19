const { getDb } = require('../config/db');

const createLabTechnician = async (data) => {
  const db = getDb();

  const command = `
    INSERT INTO LabTechnician CONTENT {
      technicianId: :technicianId,
      name: :name,
      email: :email,
      phone: :phone,
      lab: :lab
    }
  `;

  const result = await db.command(command, {
    params: data
  }).all();

  return result[0];
};

const getAllLabTechnicians = async () => {
  const db = getDb();
  const result = await db.query('SELECT * FROM LabTechnician').all();
  return result;
};

const getLabTechnicianById = async (id) => {
  const db = getDb();
  const result = await db.query(
    'SELECT * FROM LabTechnician WHERE technicianId = :id',
    { params: { id } }
  ).all();
  return result[0];
};

const updateLabTechnician = async (id, data) => {
  const db = getDb();

  const command = `
    UPDATE LabTechnician SET 
      name = :name,
      email = :email,
      phone = :phone,
      lab = :lab
    WHERE technicianId = :technicianId
  `;

  const result = await db.command(command, {
    params: { ...data, technicianId: id }
  }).all();

  return result[0];
};

const deleteLabTechnician = async (id) => {
  const db = getDb();
  await db.command('DELETE VERTEX FROM LabTechnician WHERE technicianId = :id', {
    params: { id }
  }).all();
};

module.exports = {
  createLabTechnician,
  getAllLabTechnicians,
  getLabTechnicianById,
  updateLabTechnician,
  deleteLabTechnician,
};
