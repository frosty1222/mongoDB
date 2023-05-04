const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function feedback() {
    const sequelize = await connect();
    const Feedback = sequelize.define('feedbacks', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      note:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id:{
         type:DataTypes.BIGINT,
         allowNull:false,
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
    return Feedback;
  }
  
module.exports = feedback;