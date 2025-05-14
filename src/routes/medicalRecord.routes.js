const express = require('express');
const router = express.Router(); // ✅ Express Router, not 'router' package

const { authenticateToken } = require('../middlewares/auth.middleware');
const {
  createMedicalRecordController,
  getAllMedicalRecordsController,
  getMedicalRecordByIdController,
  updateMedicalRecordController,
  deleteMedicalRecordController,
} = require('../controllers/medicalRecord.controller');

router.use(authenticateToken);

// Routes
router.post('/', createMedicalRecordController);
router.get('/', getAllMedicalRecordsController);
router.get('/:id', getMedicalRecordByIdController);
router.put('/:id', updateMedicalRecordController);
router.delete('/:id', deleteMedicalRecordController);

module.exports = router;
