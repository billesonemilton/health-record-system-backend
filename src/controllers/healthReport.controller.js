const Service = require('../services/healthReport.service');

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
res.status(200).json(result);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

exports.update = async (req, res) => {
try {
const result = await Service.update(req.params.id, req.body);
res.status(200).json(result);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

exports.delete = async (req, res) => {
try {
await Service.delete(req.params.id);
res.status(204).send();
} catch (err) {
res.status(500).json({ error: err.message });
}
};