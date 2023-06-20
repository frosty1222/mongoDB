const product = require("../models/Product");
const cart = require("../models/cart");
const cartItem = require("../models/cart_item");
const order = require("../models/order");
const orderItem = require("../models/order_item");
const payment = require("../models/payment");
const moment = require('moment');
const top = require("../models/topCount");
let date = new Date();
const isoDate = moment(date).toISOString();
class ShoppingController{
    async index(req,res){

    }
     // count add to whislist and purchase totalel
     async countHelper(req, res) {
        const TopCount = await top();
        const { product_id, isPurchase, isWhislist } = req.body;
        const topCount = await TopCount.findOne({
          where: {
            product_id: product_id,
          },
        });
      
        if (!topCount && isPurchase !== false) {
          let purchase_total = 1;
          const saveTopcount = TopCount.build({
            product_id: product_id,
            purchase_total: purchase_total,
            add_to_whislit_total: 0,
          });
          await saveTopcount.save();
        }
      
        if (!topCount && isWhislist !== false) {
          let add_to_whislit_total = 1;
          const saveTopcount = TopCount.build({
            product_id: product_id,
            purchase_total: 0,
            add_to_whislit_total: add_to_whislit_total,
          });
          await saveTopcount.save();
        }
      
        if (topCount && isPurchase !== false) {
          let purchase_total = Number(topCount.purchase_total) + 1;
          await topCount.update({ purchase_total: purchase_total });
        }
      
        if (topCount && isWhislist !== false) {
          let add_to_whislit_total = Number(topCount.add_to_whislit_total) + 1;
          await topCount.update({ add_to_whislit_total: add_to_whislit_total });
        }
      
        res.json({ message: "successfully" });
      }      
      
      async addToCart(req, res) {
        const { user_id, product_id, quantity } = req.body;
        const Cart = await cart();
        const CartItem = await cartItem();
        const existingCart = await Cart.findOne({
          where: {
            user_id: user_id,
          },
        });
      
        if (!existingCart) {
          const newCart = await Cart.create({
            user_id: user_id,
            createdAt: isoDate,
            updatedAt: null,
          });
          const cart_id = newCart.id;
      
          await CartItem.create({
            cart_id: cart_id,
            product_id: product_id,
            quantity: quantity,
            createdAt: isoDate,
            updatedAt: null,
          });
        } else {
          const cart_id = existingCart.id;
      
          const existingCartItem = await CartItem.findOne({
            where: {
              cart_id: cart_id,
              product_id: product_id,
              createdAt: isoDate,
              updatedAt: null,
            },
          });
      
          if (existingCartItem) {
            const newQuantity = Number(quantity) + Number(existingCartItem.quantity);
            await existingCartItem.update({ quantity: newQuantity });
          } else {
            await CartItem.create({
              cart_id: cart_id,
              product_id: product_id,
              quantity: quantity,
              createdAt: isoDate,
              updatedAt: null,
            });
          }
        }
      
        res.json({
          success: true,
          message: "Item added to cart successfully",
        });
      }
      
} 
module.exports = new ShoppingController();