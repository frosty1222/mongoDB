const product  = require('../models/Product');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    }
  });
class ProductController{
    async index(req,res){
        const Product = await product();
    }
    async addProduct(req,res){
        try {
            upload(req, res, async function (err) {
              if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Error uploading file' });
              } else if (err) {
                return res.status(500).json({ error: 'Internal server error' });
              }
              
              const Product = await product();
              const imageUrl = `uploads/${req.file.filename}`;
        
              Product.create({ imageUrl })
                .then(createdImage => {
                console.log("createdImage",createdImage)
                  res.json({
                    message: "Upload successful",
                    success: true,
                  });
                })
                .catch(err => {
                  res.status(500).json({ error: err.message });
                });
            });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }
    async deleteProduct(req,res){
        const Product = await product();
    }
    async editProduct(req,res){
        const Product = await product();
    }
    async getProById(req,res){
        const Product = await product();
    }
}
module.exports = new ProductController();