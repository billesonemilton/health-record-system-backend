const { getDb } = require('../config/db');

const createCitizen = async (data) => {
  const db = getDb();
  const command = `
    INSERT INTO Citizen CONTENT {
      nationalId: :nationalId,
      fullName: :fullName,
      dateOfBirth: :dateOfBirth,
      gender: :gender,
      phone: :phone,
      email: :email,
      address: :address
    }
  `;
  const result = await db.command(command, { params: data }).all();
  return result[0];
};

const getAllCitizens = async () => {
  const db = getDb();
  const result = await db.query('SELECT * FROM Citizen').all();
  return result;
};

const getCitizenById = async (id) => {
  const db = getDb();
  const result = await db.query('SELECT * FROM Citizen WHERE nationalId = :id', { params: { id } }).all();
  return result[0];
};

const updateCitizen = async (id, data) => {
  const db = getDb();
  const command = `
    UPDATE Citizen SET
      fullName = :fullName,
      dateOfBirth = :dateOfBirth,
      gender = :gender,
      phone = :phone,
      email = :email,
      address = :address
    WHERE nationalId = :nationalId
  `;
  const result = await db.command(command, { params: { ...data, nationalId: id } }).all();
  return result[0];
};

const deleteCitizen = async (id) => {
  const db = getDb();
  const result = await db.command('DELETE VERTEX Citizen WHERE nationalId = :id', { params: { id } }).all();
  return result;
};

module.exports = {
  createCitizen,
  getAllCitizens,
  getCitizenById,
  updateCitizen,
  deleteCitizen,
};
