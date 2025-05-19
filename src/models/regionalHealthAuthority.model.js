const Service = require('../services/regionalHealthAuthority.service');

exports.create = async (req, res) => {
  try {
    const result = await Service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Service.findAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await Service.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Service.update(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Service.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
