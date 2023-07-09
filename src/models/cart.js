const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function cart() {
    const sequelize = await connect();
    const Cart = sequelize.define('carts', {
      user_id:{
        type:DataTypes.BIGINT,
        allowNull:false
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
    return Cart;
  }
  
module.exports = cart;