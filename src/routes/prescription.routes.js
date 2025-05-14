const express = require('express');
const {
  createPrescriptionController,
  getAllPrescriptionsController,
  getPrescriptionByIdController,
  updatePrescriptionController,
  deletePrescriptionController
} = require('../controllers/prescription.controller');

const router = express.Router();

router.post('/', createPrescriptionController);
router.get('/', getAllPrescriptionsController);
router.get('/:id', getPrescriptionByIdController);
router.put('/:id', updatePrescriptionController);
router.delete('/:id', deletePrescriptionController);

module.exports = router;
