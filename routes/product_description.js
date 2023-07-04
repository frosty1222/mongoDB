const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const description_controller = require('../controllers/ProductDescriptionController');
router.get('/index',TokenCheckMiddleware,description_controller.index)
router.post('/add-descript',TokenCheckMiddleware,description_controller.addDescription)
router.delete('/descript-delete/:id',TokenCheckMiddleware,description_controller.deleteDescription)
router.get('/get-Des-by-id/:id',TokenCheckMiddleware,description_controller.getDesById)
router.put('/edit-descript/:id',TokenCheckMiddleware,description_controller.editDescription)
module.exports = router;