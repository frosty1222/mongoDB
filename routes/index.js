const testRouter = require('./tests');
const userRouter = require('./users');
const roleRouter = require('./roles');
function route(app) {
    app.use('/test',testRouter);
    app.use('/user',userRouter);
    app.use('/role',roleRouter);
}
module.exports = route;