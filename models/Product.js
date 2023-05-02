const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function product() {
    const sequelize = await connect();
    const Product = sequelize.define('roles', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image:{
        type:DataTypes.STRING,
        allowNull:true
      },
      price:{
        type:DataTypes.DECIMAL,
        allowNull:false
      },
      sale_price:{
        type:DataTypes.DECIMAL,
        allowNull:true
      }
    });
    return Product;
  }
  
module.exports = product;