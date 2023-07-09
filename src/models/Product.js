const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function Product() {
    const sequelize = await connect();
    const Product = sequelize.define('products', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image:{
        type:DataTypes.STRING,
        allowNull:false
      },
      price:{
        type:DataTypes.DECIMAL,
        allowNull:false
      },
      sale_price:{
        type:DataTypes.DECIMAL,
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
    return Product;
  }
  
module.exports = Product;