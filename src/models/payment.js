const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function payment() {
    const sequelize = await connect();
    const Payment = sequelize.define('payments', {
        order_id:{
            type:DataTypes.BIGINT,
            allowNull:true,
        },
        payment_amount:{
            type:DataTypes.FLOAT,
            allowNull:true,
        },
        payment_method:{
            type:DataTypes.STRING,
            allowNull:true,
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
    return Payment;
  }
  
module.exports = payment;