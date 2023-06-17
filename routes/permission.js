const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const permission_controller = require('../controllers/PermissionController');
router.get('/index',TokenCheckMiddleware,permission_controller.index)
router.post('/add-permission',TokenCheckMiddleware,permission_controller.addPermission)
router.delete('/permission-delete/:id',TokenCheckMiddleware,permission_controller.deletePermission)
router.get('/get-per-by-id/:id',TokenCheckMiddleware,permission_controller.getPermissionById)
router.put('/edit-per/:id',TokenCheckMiddleware,permission_controller.editPermission)
module.exports = router;