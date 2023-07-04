const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const rolehasper_controller = require('../controllers/RoleHasPerController');
router.get('/index',TokenCheckMiddleware,rolehasper_controller.index)
router.post('/add-role-per',TokenCheckMiddleware,rolehasper_controller.attackPerToRole)
router.delete('/role-per-delete/:id',TokenCheckMiddleware,rolehasper_controller.deleteRoleHasPer)
router.get('/get-role-per-by-id/:id',TokenCheckMiddleware,rolehasper_controller.getRoleHasPerById)
router.get('/edit-rol-per/:id',TokenCheckMiddleware,rolehasper_controller.editRoleHasPer)
module.exports = router;