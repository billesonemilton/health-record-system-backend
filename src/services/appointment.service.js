const { getDb } = require('../config/db');

const createAppointment = async (data) => {
  const db = getDb();
  const command = `
    INSERT INTO Appointment CONTENT {
      appointmentId: :appointmentId,
      citizenId: :citizenId,
      providerId: :providerId,
      date: :date,
      time: :time,
      reason: :reason
    }
  `;
  const result = await db.command(command, { params: data }).all();
  return result[0];
};

const getAllAppointments = async () => {
  const db = getDb();
  const result = await db.query('SELECT * FROM Appointment').all();
  return result;
};

const getAppointmentById = async (id) => {
  const db = getDb();
  const command = 'SELECT * FROM Appointment WHERE appointmentId = :id';
  const result = await db.query(command, { params: { id } }).all();
  return result[0];
};

const updateAppointment = async (id, data) => {
  const db = getDb();
  const command = `
    UPDATE Appointment SET
      citizenId = :citizenId,
      providerId = :providerId,
      date = :date,
      time = :time,
      reason = :reason
    WHERE appointmentId = :appointmentId
  `;
  await db.command(command, {
    params: { ...data, appointmentId: id }
  }).all();
  return { updated: true };
};

const deleteAppointment = async (id) => {
  const db = getDb();
  const command = 'DELETE VERTEX Appointment WHERE appointmentId = :id';
  await db.command(command, { params: { id } }).all();
  return { deleted: true };
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
