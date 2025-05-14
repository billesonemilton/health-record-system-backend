// src/controllers/userAccount.controller.js
const {
  createUserAccount,
  getAllUserAccounts,
  getUserAccountByUsername,
  updateUserAccount,
  deleteUserAccount,
} = require('../services/userAccount.service');

const createUserAccountController = async (req, res) => {
  try {
    const user = await createUserAccount(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUserAccountsController = async (req, res) => {
  try {
    const users = await getAllUserAccounts();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserAccountByUsernameController = async (req, res) => {
  try {
    const user = await getUserAccountByUsername(req.params.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserAccountController = async (req, res) => {
  try {
    const updatedUser = await updateUserAccount(req.params.username, req.body);
    res.status(200).json({ message: 'User updated', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUserAccountController = async (req, res) => {
  try {
    await deleteUserAccount(req.params.username);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUserAccountController,
  getAllUserAccountsController,
  getUserAccountByUsernameController,
  updateUserAccountController,
  deleteUserAccountController,
};
