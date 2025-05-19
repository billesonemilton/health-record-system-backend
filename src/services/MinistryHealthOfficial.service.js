const { getDb } = require('../config/db');

const getAll = async () => {
  const db = getDb();
  return await db.query('SELECT FROM MinistryHealthOfficial').all();
};

const getById = async (id) => {
  const db = getDb();
  const query = 'SELECT FROM MinistryHealthOfficial WHERE @rid = :id';
  return await db.query(query, { params: { id } }).one();
};

const create = async (data) => {
  const db = getDb();
  const query = `
    INSERT INTO MinistryHealthOfficial 
    SET fullName = :fullName, 
        email = :email, 
        position = :position, 
        accessLevel = :accessLevel
  `;
  return await db.command(query, { params: data }).one();
};

const update = async (id, data) => {
  const db = getDb();
  const setStatements = Object.keys(data)
    .map((key) => `${key} = :${key}`)
    .join(', ');
  const query = `UPDATE MinistryHealthOfficial SET ${setStatements} WHERE @rid = :id`;
  return await db.command(query, { params: { ...data, id } }).one();
};

const remove = async (id) => {
  const db = getDb();
  const query = 'DELETE VERTEX MinistryHealthOfficial WHERE @rid = :id';
  return await db.command(query, { params: { id } }).all();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
