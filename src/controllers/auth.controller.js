const { registerUser, loginUser } = require('../services/auth.service');

const registerController = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    console.error('Login Error:', err);
    res.status(401).json({ error: err.message });
  }
};

module.exports = { registerController, loginController };
