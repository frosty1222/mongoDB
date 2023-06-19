const path = require('path');
const dotenv = require('dotenv').config();
const initUserModel = require('./models/User');
const initProductModel = require('./models/Product');
const initRoleModel = require('./models/Role');
const initProductDescriptionModel = require('./models/ProductDescription');
const initRoleHasPerModel = require('./models/RoleHasPer');
const initPermissionModel = require('./models/Permission');
const initFeedbackModel = require('./models/feedbacks');
const initOrderModel = require('./models/order');
const initCartModel = require('./models/cart');
const initCartItemModel = require('./models/order_item');
const initOrderItemModel = require('./models/cart');
const initPaymentModel = require('./models/payment');
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
    const Product = initProductModel(sequelize);
    const ProductDescription = initProductDescriptionModel(sequelize);
    const Role = initRoleModel(sequelize);
    const RoleHasPer = initRoleHasPerModel(sequelize);
    const Permission = initPermissionModel(sequelize);
    const Feedback = initFeedbackModel(sequelize);
    const Order = initOrderModel(sequelize);
    const Cart = initCartModel(sequelize);
    const CartItem = initCartItemModel(sequelize);
    const OrderItem = initOrderItemModel(sequelize);
    const Payment = initPaymentModel(sequelize);
    await sequelize.sync();
    return [User,Product,ProductDescription,Role,RoleHasPer,Permission,Feedback,Order,Cart];
}
setup().then((User) => {
    console.log('User model has been set up.');
  }).catch((error) => {
    console.error('Failed to set up User model:', error);
  });
app.use(cors({
    origin:'*'
}));
app.use(express.static('public'));
route(app);
app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})