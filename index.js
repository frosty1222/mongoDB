const path = require('path');
const initUserModel = require('./models/User');
const express = require('express');
var cors = require('cors');
const app = express();
const db =require('./dbconnect');
const route = require('./routes');
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    }),
);
// app.use('/api', route);

async function setup() {
    const sequelize = await db.connect();
    const User = initUserModel(sequelize);
    await sequelize.sync();
    return [User];
}
setup().then((User) => {
    console.log('User model has been set up.');
  }).catch((error) => {
    console.error('Failed to set up User model:', error);
  });
app.use(cors({
    origin:'*'
}));
app.use(express.static('uploads'));
route(app);
app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})