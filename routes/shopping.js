const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const shopping_controller = require('../controllers/ShoppingController');
router.post('/add-to-cart',shopping_controller.addToCart);
router.post('/count_top',shopping_controller.countHelper);
module.exports = router;