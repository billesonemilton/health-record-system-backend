const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../services/appointment.service');

const createAppointmentController = async (req, res) => {
  try {
    const result = await createAppointment(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

const getAllAppointmentsController = async (req, res) => {
  try {
    const result = await getAllAppointments();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

const getAppointmentByIdController = async (req, res) => {
  try {
    const result = await getAppointmentById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const result = await updateAppointment(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

const deleteAppointmentController = async (req, res) => {
  try {
    const result = await deleteAppointment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};

module.exports = {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
};
