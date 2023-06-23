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
            },
          });
      
          if (existingCartItem) {
            const newQuantity = Number(quantity) + Number(existingCartItem.quantity);
            await existingCartItem.update({ quantity: newQuantity,updatedAt:isoDate });
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
      
      async showItemCart(req, res) {
        let quantity = 0;
        const CartItem = await cartItem();
        const Cart = await cart();
        const { user_id } = req.params;
        
        Cart.findOne({
          where: {
            user_id: user_id
          }
        }).then(async (response) => {
          const cartId = response.id;
          const cartItem = await CartItem.findAll({
            where: {
              cart_id: cartId
            }
          });
          
          if (cartItem.length > 0) {
            for (let i = 0; i < cartItem.length; i++) {
              quantity += cartItem[i].quantity;
            }
          }
          
          res.json({
            quantity: quantity
          });
        }).catch((error) => {
          console.log(error);
          res.status(500).json({
            error: "An error occurred while fetching the cart items."
          });
        });
      }
      async showCartView(req, res) {
        const { user_id } = req.params;
        const Cart = await cart();
        const CartItem = await cartItem();
        const Product = await product();
        const carts = await Cart.findOne({
          where: {
            user_id: user_id
          }
        });
        if(carts){
          const cartId = carts.id;
          const cartItems = await CartItem.findAll({
            where: {
              cart_id: cartId
            }
          });
          const products = await Product.findAll();
        
          const newCart = [];
        
          for (const product of products) {
            const cartItem = cartItems.find(item => item.product_id === product.id);
            if (cartItem) {
              newCart.push({
                ...product,
                quantity: cartItem.quantity
              });
            }
          }
        }
      
        console.log("cartItems", cartItems);
        res.json({
          cart: newCart
        });
      }
      async placeOrder(req, res) {
        const {
          product_id,
          unit_price,
          user_id,
          quantity,
          total_amount
        } = req.body;
      
        const OrderItem = await orderItem();
        const Order = await order();
        const existOrder = await Order.findOne({
          where: {
            user_id: user_id
          }
        });
      
        if (!existOrder) {
          const orderCreate = await Order.create({
            user_id: user_id,
            total_amount: total_amount,
            createdAt: isoDate,
            updatedAt: null
          });
      
          if (orderCreate) {
            const orderId = orderCreate.id;
      
            const orderItemCreate = await OrderItem.create({
              order_id: orderId,
              product_id: product_id,
              quantity: quantity,
              unit_price: unit_price,
              discount_percentage: null,
              discount_amount: null,
              createdAt: isoDate,
              updatedAt: null
            });
      
            if (orderItemCreate) {
              const CartItem = await cartItem();
              const cartItems = await CartItem.findAll({
                where: {
                  product_id: product_id
                }
              });
      
              if (cartItems && cartItems.length > 0) {
                await CartItem.destroy({
                  where: {
                    product_id: product_id
                  }
                });
              } else {
                const Cart = await cart();
                await Cart.destroy({
                  where: {
                    user_id: user_id
                  }
                });
              }
      
              res.json({
                success: true,
                message: "Order placed successfully!"
              });
            } else {
              res.json({
                success: false,
                message: "Failed to create order item."
              });
            }
          } else {
            res.json({
              success: false,
              message: "Failed to create order."
            });
          }
        } else {
          const existOrderItem = await OrderItem.findOne({
            where: {
              order_id: existOrder.id,
              product_id: product_id
            }
          });
      
          if (existOrderItem) {
            const CartItem = await cartItem();
            await existOrderItem.update({
              quantity: quantity + existOrderItem.quantity,
              unit_price: unit_price
            });
            const cartItems = await CartItem.findAll({
              where: {
                product_id: product_id
              }
            });
    
            if (cartItems && cartItems.length > 0) {
              await CartItem.destroy({
                where: {
                  product_id: product_id
                }
              });
            } else {
              const Cart = await cart();
              await Cart.destroy({
                where: {
                  user_id: user_id
                }
              });
            }
    
          } else {
            const CartItem = await cartItem();
            await OrderItem.create({
              order_id: existOrder.id,
              product_id: product_id,
              quantity: quantity,
              unit_price: unit_price,
              discount_percentage: null,
              discount_amount: null,
              createdAt: isoDate,
              updatedAt: null
            });
            const cartItems = await CartItem.findAll({
              where: {
                product_id: product_id
              }
            });
    
            if (cartItems && cartItems.length > 0) {
              await CartItem.destroy({
                where: {
                  product_id: product_id
                }
              });
            } else {
              const Cart = await cart();
              await Cart.destroy({
                where: {
                  user_id: user_id
                }
              });
            }
          }
      
          res.json({
            success:true,
            message: "An order has been placed."
          });
        }
      }
      
      async showOrder(req,res){
          const { user_id } = req.params;
          const Order = await order();
          const OrderItem = await orderItem();
          const Product = await product();
          const newOrder = [];
          const existOrder = await Order.findOne({
            where:{
              user_id:user_id
            }
          });
          if(existOrder){
             const order_item = await OrderItem.findAll({
               where:{
                 order_id:existOrder.id
               }
             })
             const products = await Product.findAll();
             for (const product of products) {
              const orders = order_item.find(item => item.product_id === product.id);
              if (orders) {
                newOrder.push({
                  ...product,
                  quantity: orders.quantity,
                  unit_price:orders.unit_price,
                  order_id:orders.order_id
                });
                if(orders.length > 0){
                  await OrderItem.destroy({
                    where:{
                       order_id:existOrder.id
                    }
                  })
                  const orerItemLength = await OrderItem.findAll({
                    where:{
                      order_id:existOrder.id
                    }
                  })
                  if(orerItemLength.length  === 0){
                    await Order.destroy({
                      where:{
                         user_id:user_id
                      }
                    })
                    res.json({
                       message:"Orders Empty"
                    })
                  }
                }
              }
            }
          }
        if(newOrder.length > 0){
          res.json({
             order:newOrder,
             success:true
          })
        }
      }
     async deleteOrder(req,res){
        const {product_id,order_id,user_id} = req.body;
        const Order = await order();
        const OrderItem = await orderItem();
        const orerItemLength = await OrderItem.findAll({
          where:{
            order_id:existOrder.id
          }
        })
        if(orerItemLength.length  === 0){
          await Order.destroy({
            where:{
               user_id:user_id
            }
          })
          res.json({
             message:"Orders Empty"
          })
        }else{
          const deleteOrer = OrderItem.destroy({
            where:{
              order_id:order_id,
              product_id:product_id
            }
          })
          if(deleteOrer){
            res.json({
              message:"order has been deleted!",
              success:true
            })
          }
        }
     }
      
} 
module.exports = new ShoppingController();