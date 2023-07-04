const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function order() {
    const sequelize = await connect();
    const Order = sequelize.define('orders', {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_amount:{
        type:DataTypes.FLOAT,
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
    return Order;
  }
  
module.exports = order;