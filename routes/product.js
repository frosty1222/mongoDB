const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const product_controller = require('../controllers/ProductController');
router.get('/index',TokenCheckMiddleware,product_controller.index)
router.post('/add-pro',TokenCheckMiddleware,product_controller.addProduct)
router.delete('/product-delete/:id',TokenCheckMiddleware,product_controller.deleteProduct)
router.get('/get-pro-by-id/:id',TokenCheckMiddleware,product_controller.getProById)
router.put('/edit-pro/:id',TokenCheckMiddleware,product_controller.editProduct)
module.exports = router;