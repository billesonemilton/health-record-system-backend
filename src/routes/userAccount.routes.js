// src/routes/userAccount.routes.js
const express = require('express');
const router = express.Router();
const {
  createUserAccountController,
  getAllUserAccountsController,
  getUserAccountByUsernameController,
  updateUserAccountController,
  deleteUserAccountController,
} = require('../controllers/userAccount.controller');

router.post('/', createUserAccountController);
router.get('/', getAllUserAccountsController);
router.get('/:username', getUserAccountByUsernameController);
router.put('/:username', updateUserAccountController);
router.delete('/:username', deleteUserAccountController);

module.exports = router;
