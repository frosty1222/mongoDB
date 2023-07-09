const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function topCount() {
    const sequelize = await connect();
    const TopCount = sequelize.define('top_counts', {
      product_id:{
        type:DataTypes.BIGINT,
        allowNull:false
      },
      purchase_total:{
        type:DataTypes.NUMBER,
        allowNull:true,
      },
      add_to_whislit_total:{
        type:DataTypes.NUMBER,
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
    return TopCount;
  }
  
module.exports = topCount;