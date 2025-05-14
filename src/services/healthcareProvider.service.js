const { getDb } = require('../config/db');

const createHealthcareProvider = async (data) => {
  const db = getDb();

  const command = `
    INSERT INTO HealthcareProvider CONTENT {
      providerId: :providerId,
      name: :name,
      specialization: :specialization,
      phone: :phone,
      email: :email,
      facility: :facility
    }
  `;

  const result = await db.command(command, {
    params: data
  }).all();

  return result[0];
};

const getAllHealthcareProviders = async () => {
  const db = getDb();
  const result = await db.query('SELECT * FROM HealthcareProvider').all();
  return result;
};

const getHealthcareProviderById = async (id) => {
  const db = getDb();
  const result = await db.query(
    'SELECT * FROM HealthcareProvider WHERE providerId = :id',
    { params: { id } }
  ).all();
  return result[0];
};

const updateHealthcareProvider = async (id, data) => {
  const db = getDb();

  const command = `
    UPDATE HealthcareProvider SET 
      name = :name,
      specialization = :specialization,
      phone = :phone,
      email = :email,
      facility = :facility
    WHERE providerId = :providerId
  `;

  const result = await db.command(command, {
    params: { ...data, providerId: id }
  }).all();

  return result[0];
};

const deleteHealthcareProvider = async (id) => {
  const db = getDb();
  await db.command('DELETE VERTEX FROM HealthcareProvider WHERE providerId = :id', {
    params: { id }
  }).all();
};

module.exports = {
  createHealthcareProvider,
  getAllHealthcareProviders,
  getHealthcareProviderById,
  updateHealthcareProvider,
  deleteHealthcareProvider,
};
