const express = require('express');
const router = express.Router();
const controller = require('../controllers/systemAdmin.contrlloer');

router.post('/', controller.createSystemAdmin);
router.get('/', controller.getAllSystemAdmins);
router.get('/:id', controller.getSystemAdminById);
router.put('/:id', controller.updateSystemAdmin);
router.delete('/:id', controller.deleteSystemAdmin);

module.exports = router;
