const testRouter = require('./tests');
const userRouter = require('./users');

function route(app) {
    app.use('/test',testRouter);
    app.use('/user',userRouter);
}
module.exports = route;