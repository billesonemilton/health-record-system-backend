const { getDb } = require('../config/db');

const createFacility = async (data) => {
  const db = getDb();
  const command = `
    INSERT INTO HealthFacility CONTENT {
      facilityId: :facilityId,
      name: :name,
      type: :type,
      location: :location,
      contactNumber: :contactNumber
    }
  `;

  const result = await db.command(command, {
    params: {
      facilityId: data.facilityId,
      name: data.name,
      type: data.type,
      location: data.location,
      contactNumber: data.contactNumber,
    },
  }).all();

  return result[0];
};

const getAllFacilities = async () => {
  const db = getDb();
  return await db.query('SELECT * FROM HealthFacility');
};

const getFacilityById = async (id) => {
  const db = getDb();
  const result = await db.query('SELECT * FROM HealthFacility WHERE facilityId = :id', {
    params: { id },
  });
  return result[0];
};

const updateFacility = async (id, data) => {
  const db = getDb();
  const command = `
    UPDATE HealthFacility SET 
      name = :name,
      type = :type,
      location = :location,
      contactNumber = :contactNumber
    WHERE facilityId = :facilityId
  `;

  const result = await db.command(command, {
    params: {
      facilityId: id,
      name: data.name,
      type: data.type,
      location: data.location,
      contactNumber: data.contactNumber,
    },
  }).all();

  return result[0];
};

const deleteFacility = async (id) => {
  const db = getDb();
  return await db.command('DELETE VERTEX HealthFacility WHERE facilityId = :id', {
    params: { id },
  }).all();
};

module.exports = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
