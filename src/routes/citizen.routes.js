const express = require('express');
const {
  createCitizenController,
  getAllCitizensController,
  getCitizenByIdController,
  updateCitizenController,
  deleteCitizenController
} = require('../controllers/citizen.controller');

const router = express.Router();

router.post('/', createCitizenController);
router.get('/', getAllCitizensController);
router.get('/:id', getCitizenByIdController);
router.put('/:id', updateCitizenController);
router.delete('/:id', deleteCitizenController);

module.exports = router;
