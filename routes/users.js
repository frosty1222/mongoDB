const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/UserController');
router.get('/user-index',user_controller.index);
router.post('/user-add',user_controller.addUser);
router.get('/user-by-id/:id',user_controller.findOne);
router.put('/user-update/:id',user_controller.updateUser);
router.delete('/user-delete/:id',user_controller.deleteUser)
module.exports = router;