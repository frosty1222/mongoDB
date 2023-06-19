const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function cartItem() {
    const sequelize = await connect();
    const CartItem = sequelize.define('cart_items', {
      cart_id:{
        type:DataTypes.BIGINT,
        allowNull:false
      },
      product_id:{
        type:DataTypes.BIGINT,
        allowNull:false
      },
      quantity:{
         type:DataTypes.NUMBER,
         allowNull:false,
      },
      createdAt:{
        type:DataTypes.DATE,
        allowNull:true,
      },
      updatedAt:{
        type:DataTypes.DATE,
        allowNull:true,
      }
    });
    return CartItem;
  }
  
module.exports = cartItem;