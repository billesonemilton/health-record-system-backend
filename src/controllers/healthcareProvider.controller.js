const {
  createHealthcareProvider,
  getAllHealthcareProviders,
  getHealthcareProviderById,
  updateHealthcareProvider,
  deleteHealthcareProvider,
} = require('../services/healthcareProvider.service');

const createHealthcareProviderController = async (req, res) => {
  try {
    const provider = await createHealthcareProvider(req.body);
    res.status(201).json(provider);
  } catch (error) {
    console.error('Failed to create healthcare provider:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllHealthcareProvidersController = async (req, res) => {
  try {
    const providers = await getAllHealthcareProviders();
    res.status(200).json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getHealthcareProviderByIdController = async (req, res) => {
  try {
    const provider = await getHealthcareProviderById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json(provider);
  } catch (error) {
    console.error('Error fetching provider by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateHealthcareProviderController = async (req, res) => {
  try {
    const updated = await updateHealthcareProvider(req.params.id, req.body);
    res.status(200).json({ message: 'Provider updated', data: updated });
  } catch (error) {
    console.error('Error updating provider:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteHealthcareProviderController = async (req, res) => {
  try {
    await deleteHealthcareProvider(req.params.id);
    res.status(200).json({ message: 'Provider deleted' });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createHealthcareProviderController,
  getAllHealthcareProvidersController,
  getHealthcareProviderByIdController,
  updateHealthcareProviderController,
  deleteHealthcareProviderController,
};
