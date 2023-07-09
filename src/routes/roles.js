const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const role_controller = require('../controllers/RoleController');
router.get('/index',TokenCheckMiddleware,role_controller.index)
router.post('/add-role',TokenCheckMiddleware,role_controller.addRole)
router.delete('/role-delete/:id',TokenCheckMiddleware,role_controller.deleteRole)
router.get('/get-data-by-id/:id',TokenCheckMiddleware,role_controller.getRoleById)
router.put('/edit-role/:id',TokenCheckMiddleware,role_controller.editRole)
module.exports = router;