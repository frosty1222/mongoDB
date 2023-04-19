const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/UserController');
router.get('/user-index',user_controller.index);
router.post('/user-add',user_controller.addUser);
router.get('/user-by-id/:id',user_controller.findOne);
module.exports = router;