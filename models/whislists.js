const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function whislist() {
    const sequelize = await connect();
    const Whislist = sequelize.define('whislists', {
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
    return Whislist;
  }
  
module.exports = whislist;