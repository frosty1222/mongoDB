const testRouter = require('./tests');

function route(app) {
    app.use('/test',testRouter);
}
module.exports = route;