const express = require('express');
const {
  createFacilityController,
  getAllFacilitiesController,
  getFacilityByIdController,
  updateFacilityController,
  deleteFacilityController,
} = require('../controllers/healthFacility.controller');

const router = express.Router();

router.post('/', createFacilityController);
router.get('/', getAllFacilitiesController);
router.get('/:id', getFacilityByIdController);
router.put('/:id', updateFacilityController);
router.delete('/:id', deleteFacilityController);

module.exports = router;
