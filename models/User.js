const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function setup() {
    const sequelize = await connect();
    const User = sequelize.define('users', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt:{
        type: DataTypes.STRING,
        allowNull: false
      },
      updatedAt:{
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    return User;
  }
  
module.exports = setup;