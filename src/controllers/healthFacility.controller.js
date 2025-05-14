const {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} = require('../services/heathFacility.service');

const createFacilityController = async (req, res) => {
  try {
    const facility = await createFacility(req.body);
    res.status(201).json(facility);
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllFacilitiesController = async (req, res) => {
  try {
    const facilities = await getAllFacilities();
    res.status(200).json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving facilities' });
  }
};

const getFacilityByIdController = async (req, res) => {
  try {
    const facility = await getFacilityById(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.status(200).json(facility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving facility' });
  }
};

const updateFacilityController = async (req, res) => {
  try {
    const updatedFacility = await updateFacility(req.params.id, req.body);
    res.status(200).json({ message: 'Facility updated successfully', data: updatedFacility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating facility' });
  }
};

const deleteFacilityController = async (req, res) => {
  try {
    await deleteFacility(req.params.id);
    res.status(200).json({ message: 'Facility deleted successfully' });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({ message: 'Error deleting facility' });
  }
};

module.exports = {
  createFacilityController,
  getAllFacilitiesController,
  getFacilityByIdController,
  updateFacilityController,
  deleteFacilityController,
};
