const { Sequelize } = require('sequelize');

async function connect() {
  const sequelize = new Sequelize('mysql://username:My$tr0ngP@ssw0rd@localhost:3306/node_');
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return sequelize;
}

module.exports = { connect };

