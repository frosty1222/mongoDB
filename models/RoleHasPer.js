const { connect } = require('../dbconnect');
const Sequelize =require('sequelize');
const DataTypes= Sequelize.DataTypes;
async function role_has_per() {
    const sequelize = await connect();
    const RoleHasPer = sequelize.define('role_has_per', {
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      permission_id:{
        type:DataTypes.BIGINT,
        allowNull:false
      }
    });
    return RoleHasPer;
  }
  
module.exports = role_has_per;