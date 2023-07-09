const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function role() {
    const sequelize = await connect();
    const Role = sequelize.define('roles', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
    return Role;
  }
  
module.exports = role;