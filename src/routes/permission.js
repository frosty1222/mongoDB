const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const permission_controller = require('../controllers/PermissionController');
router.get('/index',TokenCheckMiddleware,permission_controller.index)
router.post('/add-permission',TokenCheckMiddleware,permission_controller.addPer)
router.delete('/permission-delete/:id',TokenCheckMiddleware,permission_controller.deletePer)
router.get('/get-per-by-id/:id',TokenCheckMiddleware,permission_controller.getperById)
module.exports = router;