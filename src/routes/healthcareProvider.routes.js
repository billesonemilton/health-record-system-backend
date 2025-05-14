const express = require('express');
const router = express.Router();
const { 
  createHealthcareProviderController, 
  getAllHealthcareProvidersController, 
  getHealthcareProviderByIdController, 
  updateHealthcareProviderController, 
  deleteHealthcareProviderController 
} = require('../controllers/healthcareProvider.controller');

// Create
router.post('/', createHealthcareProviderController);

// Read all
router.get('/', getAllHealthcareProvidersController);

// Read by ID
router.get('/:id', getHealthcareProviderByIdController);

// Update
router.put('/:id', updateHealthcareProviderController);

// Delete
router.delete('/:id', deleteHealthcareProviderController);

module.exports = router;
