const { getDb } = require('../config/db');

const createSystemAdmin = async (data) => {
  const db = getDb();

  const command = `
    INSERT INTO SystemAdmin CONTENT {
      adminId: :adminId,
      name: :name,
      email: :email,
      phone: :phone,
      role: :role
    }
  `;

  const result = await db.command(command, {
    params: data
  }).all();

  return result[0];
};

const getAllSystemAdmins = async () => {
  const db = getDb();
  const result = await db.query('SELECT * FROM SystemAdmin').all();
  return result;
};

const getSystemAdminById = async (id) => {
  const db = getDb();
  const result = await db.query(
    'SELECT * FROM SystemAdmin WHERE adminId = :id',
    { params: { id } }
  ).all();
  return result[0];
};

const updateSystemAdmin = async (id, data) => {
  const db = getDb();

  const command = `
    UPDATE SystemAdmin SET 
      name = :name,
      email = :email,
      phone = :phone,
      role = :role
    WHERE adminId = :adminId
  `;

  const result = await db.command(command, {
    params: { ...data, adminId: id }
  }).all();

  return result[0];
};

const deleteSystemAdmin = async (id) => {
  const db = getDb();
  await db.command('DELETE VERTEX FROM SystemAdmin WHERE adminId = :id', {
    params: { id }
  }).all();
};

module.exports = {
  createSystemAdmin,
  getAllSystemAdmins,
  getSystemAdminById,
  updateSystemAdmin,
  deleteSystemAdmin,
};
