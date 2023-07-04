const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function orderItem() {
    const sequelize = await connect();
    const OrderItem = sequelize.define('order_items', {
      order_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_id:{
        type:DataTypes.BIGINT
      },
      quantity:{
        type:DataTypes.NUMBER,
        allowNull:false
      },
      unit_price:{
        type:DataTypes.NUMBER,
        allowNull:false
      },
      discount_percentage:{
        type:DataTypes.FLOAT,
        allowNull:true
      },
      discount_amount:{
        type:DataTypes.FLOAT,
        allowNull:true
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
    return OrderItem;
  }
  
module.exports = orderItem;