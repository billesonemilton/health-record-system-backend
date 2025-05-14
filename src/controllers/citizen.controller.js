const {
  createCitizen,
  getAllCitizens,
  getCitizenById,
  updateCitizen,
  deleteCitizen
} = require('../services/citizen.service');

const createCitizenController = async (req, res) => {
  try {
    const citizen = await createCitizen(req.body);
    res.status(201).json(citizen);
  } catch (error) {
    console.error('Error creating citizen:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllCitizensController = async (req, res) => {
  try {
    const citizens = await getAllCitizens();
    res.status(200).json(citizens);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCitizenByIdController = async (req, res) => {
  try {
    const citizen = await getCitizenById(req.params.id);
    if (!citizen) return res.status(404).json({ message: 'Citizen not found' });
    res.status(200).json(citizen);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCitizenController = async (req, res) => {
  try {
    const updated = await updateCitizen(req.params.id, req.body);
    res.status(200).json({ message: 'Citizen updated', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCitizenController = async (req, res) => {
  try {
    await deleteCitizen(req.params.id);
    res.status(200).json({ message: 'Citizen deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCitizenController,
  getAllCitizensController,
  getCitizenByIdController,
  updateCitizenController,
  deleteCitizenController,
};
