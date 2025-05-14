// src/services/userAccount.service.js
const { getDb } = require('../config/db');

const createUserAccount = async (data) => {
  const db = getDb();
  const command = `
    INSERT INTO UserAccount CONTENT {
      username: :username,
      password: :password,
      role: :role,
      fullName: :fullName,
      email: :email,
      phone: :phone
    }
  `;
  const params = {
    params: {
      username: data.username,
      password: data.password,
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    },
  };
  const result = await db.command(command, params).all();
  return result[0];
};

const getAllUserAccounts = async () => {
  const db = getDb();
  const result = await db.command('SELECT * FROM UserAccount').all();
  return result;
};

const getUserAccountByUsername = async (username) => {
  const db = getDb();
  const result = await db.command('SELECT * FROM UserAccount WHERE username = :username', {
    params: { username },
  }).all();
  return result[0];
};

const updateUserAccount = async (username, data) => {
  const db = getDb();
  const command = `
    UPDATE UserAccount SET
      password = :password,
      role = :role,
      fullName = :fullName,
      email = :email,
      phone = :phone
    WHERE username = :username
  `;
  const params = {
    params: {
      username,
      password: data.password,
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    },
  };
  const result = await db.command(command, params).all();
  return result[0];
};

const deleteUserAccount = async (username) => {
  const db = getDb();
  const result = await db.command('DELETE VERTEX UserAccount WHERE username = :username', {
    params: { username },
  }).all();
  return result;
};

module.exports = {
  createUserAccount,
  getAllUserAccounts,
  getUserAccountByUsername,
  updateUserAccount,
  deleteUserAccount,
};
