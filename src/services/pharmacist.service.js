const { getDb } = require('../config/db');

async function create(data) {
  const db = getDb();
  const query = `
    INSERT INTO Pharmacist (pharmacistId, name, license, email, phone)
    VALUES (:pharmacistId, :name, :license, :email, :phone)
  `;
  return await db.command(query, { params: data }).one();
}

async function findAll() {
  const db = getDb();
  const query = `SELECT FROM Pharmacist`;
  return await db.query(query).all();
}

async function findById(id) {
  const db = getDb();
  const query = `SELECT FROM Pharmacist WHERE pharmacistId = :id`;
  return await db.query(query, { params: { id } }).one();
}

async function update(id, data) {
  const db = getDb();
  const query = `
    UPDATE Pharmacist SET 
      name = :name,
      license = :license,
      email = :email,
      phone = :phone 
    WHERE pharmacistId = :id
  `;
  return await db.command(query, { params: { ...data, id } }).all();
}

async function remove(id) {
  const db = getDb();
  const query = `DELETE FROM Pharmacist WHERE pharmacistId = :id`;
  return await db.command(query, { params: { id } }).all();
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: remove
};
