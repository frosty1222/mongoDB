const testRouter = require('./tests');
const userRouter = require('./users');
const roleRouter = require('./roles');
const perRouter = require('./permission');
function route(app) {
    app.use('/test',testRouter);
    app.use('/user',userRouter);
    app.use('/role',roleRouter);
    app.use('/per',perRouter)
}
module.exports = route;