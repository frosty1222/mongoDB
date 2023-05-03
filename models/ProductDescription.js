const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function prdescription() {
    const sequelize = await connect();
    const Prdescription = sequelize.define('prdescriptions', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      script1:{
        type:DataTypes.TEXT,
        allowNull:true
      },
      script2:{
        type:DataTypes.TEXT,
        allowNull:true
      },
      script3:{
        type:DataTypes.TEXT,
        allowNull:true
      },
      product_id:{
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
    return Prdescription;
  }
  
module.exports = prdescription;