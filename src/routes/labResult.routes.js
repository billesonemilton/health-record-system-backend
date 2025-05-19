const express = require('express');
const router = express.Router();
const LabResultController = require('../controllers/labResult.controller');

router.post('/', LabResultController.create);
router.get('/', LabResultController.findAll);
router.get('/:id', LabResultController.findById);
router.put('/:id', LabResultController.update);
router.delete('/:id', LabResultController.delete);

module.exports = router;
