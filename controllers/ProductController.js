const product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '..', 'public', 'uploads');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage }).single('image');

class ProductController {
  async index(req, res) {
    const Product = await product();
    const data = await Product.findAll();
    if(data){
        res.json({
            'success':true,
            'product':data
        })
    }else{
        res.json({'success':false})
    }
  }

  async addProduct(req, res) {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading file' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!req.file) {
          return res.status(400).json({ error: 'No image file provided' });
        }

        const Product = await product();
        const imageUrl = `uploads/${req.file.filename}`;
        const image = imageUrl;
        const { name, price, sale_price } = req.body;
        console.log("imageUrl",imageUrl)
        Product.create({name,image,price, sale_price })
          .then(createdProduct => {
            console.log("createdProduct", createdProduct);
            res.json({
              message: "Product created successfully",
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

  async deleteProduct(req, res) {
    const Product = await product();
        const {id} = req.params
        Product.destroy({
            where: {
              id:id
            }
        }).then(()=>{
            res.json({
                'message':"delete product successfully"
            })
        }).catch(err=>{
            console.log(err)
        })
  }

  async editProduct(req, res) {
    const Product = await product();
    const {id} = req.params
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading file' });
        } else if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!req.file) {
           const { name, price, sale_price,image } = req.body;
          Product.update({name:name,image:image,price:price, sale_price:sale_price },{
            where:{id:id}
          })
            .then(createdProduct => {
              res.json({
                message: "Product updated successfully",
                success: true,
              });
            })
            .catch(err => {
              res.status(500).json({ error: err.message });
            });
        }

        const Product = await product();
        const imageUrl = `uploads/${req.file.filename}`;
        const image = imageUrl;
        const { name, price, sale_price } = req.body;
        console.log("imageUrl",imageUrl)
        Product.update({name:name,image:image,price:price, sale_price:sale_price },{
          where:{id:id}
        })
          .then(createdProduct => {
            res.json({
              message: "Product updated successfully",
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
    // Implement your logic for editing a product
  }

  async getProById(req, res) {
    const Product = await product();
    const {id} = req.params
    Product.findOne({
      where:{
          id:id
      }
      }).then(response=>{
          res.json({
              productById:response
          })
      }).catch(err=>{
          res.json({
              err:err
          })
      })
  }
}

module.exports = new ProductController();