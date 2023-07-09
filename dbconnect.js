const { Sequelize } = require('sequelize');
const Pass =process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const user  = process.env.DB_USER;
async function connect() {
  const sequelize = new Sequelize(`mysql://${user}:${Pass}@localhost:3306/${db_name}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return sequelize;
}

module.exports = { connect };

