const path = require('path');
const dotenv = require('dotenv').config();
const initProductModel = require('./src/models/Product');
const initRoleModel = require('./src/models/Role');
const initProductDescriptionModel = require('./src/models/ProductDescription');
const initRoleHasPerModel = require('./src/models/RoleHasPer');
const initPermissionModel = require('./src/models/Permission');
const initFeedbackModel = require('./src/models/feedbacks');
const initOrderModel = require('./src/models/order');
const initCartModel = require('./src/models/cart');
const initCartItemModel = require('./src/models/order_item');
const initOrderItemModel = require('./src/models/cart');
const initPaymentModel = require('./src/models/payment');
const initTopCountModel = require('./src/models/topCount');
const initWhislistModel = require('./src/models/whislists');
const initUserModel = require('./src/models/user');
const express = require('express');
var cors = require('cors');
const app = express();
const db =require('./src/dbconnect');
const route = require('./src/routes');
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
    const TopCount = initTopCountModel(sequelize);
    const Whislist = initWhislistModel(sequelize);
    await sequelize.sync();
    return [CartItem,User,Product,ProductDescription,Role,RoleHasPer,Permission,Feedback,Order,Cart,TopCount,OrderItem,Payment,Whislist];
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
const node_port = process.env.PORT;
app.listen(node_port, () => {
    console.log(`Server Started at ${node_port}`)
})