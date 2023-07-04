const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const product_controller = require('../controllers/ProductController');
router.get('/index',TokenCheckMiddleware,product_controller.index)
router.post('/add-pro',TokenCheckMiddleware,product_controller.addProduct)
router.delete('/product-delete/:id',TokenCheckMiddleware,product_controller.deleteProduct)
router.get('/get-pro-by-id/:id',TokenCheckMiddleware,product_controller.getProById)
router.put('/edit-pro/:id',TokenCheckMiddleware,product_controller.editProduct)
router.get('/convert-into-xml-get',product_controller.convertIntoXMLGet)
router.get('/get-by-id-xml/:id',product_controller.getProByIdXml)
router.put('/edit-product-xml',product_controller.editProductXML);
router.post('/add-product-xml',product_controller.addProductXML);
router.delete('/deleteProductXML/:id',product_controller.deleteProductXML)
router.delete('/delete-product-xml/:id',product_controller.deleteProductXML);
module.exports = router;