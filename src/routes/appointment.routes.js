const express = require('express');
const {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
} = require('../controllers/appointment.controller');

const router = express.Router();

router.post('/', createAppointmentController);
router.get('/', getAllAppointmentsController);
router.get('/:id', getAppointmentByIdController);
router.put('/:id', updateAppointmentController);
router.delete('/:id', deleteAppointmentController);

module.exports = router;
