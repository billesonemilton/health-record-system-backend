const express = require('express');
const router = express.Router();
const controller = require('../controllers/labTechnician.controller');

router.post('/', controller.createLabTechnician);
router.get('/', controller.getAllLabTechnicians);
router.get('/:id', controller.getLabTechnicianById);
router.put('/:id', controller.updateLabTechnician);
router.delete('/:id', controller.deleteLabTechnician);

module.exports = router;
