const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function permission() {
    const sequelize = await connect();
    const Permission = sequelize.define('permissions', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
    return Permission;
  }
  
module.exports = permission;