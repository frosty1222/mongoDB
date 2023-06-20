const testRouter = require('./tests');
const userRouter = require('./users');
const roleRouter = require('./roles');
const productRouter = require('./product');
const perRouter = require('./permission');
const desRouter = require('./product_description');
const rolehasperRouter = require('./role_has_per');
const shoppingRouter = require('./shopping');
function route(app) {
    app.use('/test',testRouter);
    app.use('/user',userRouter);
    app.use('/role',roleRouter);
    app.use('/product',productRouter);
    app.use('/permission',perRouter);
    app.use('/description',desRouter);
    app.use('/rolehasper',rolehasperRouter);
    app.use('/shopping',shoppingRouter);
}
module.exports = route;