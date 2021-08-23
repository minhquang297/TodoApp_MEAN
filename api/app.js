const express = require('express');
var cors = require('cors')
const app = express();

const { mongoose } = require('./config/mongoose');

const bodyParser = require('body-parser');

var authMiddleware = require('./middlewares/auth.middleware');
var listRouter = require('./router/list.router');
var userRouter = require('./router/user.router');
var adminRouter = require('./router/admin.router')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

app.use(bodyParser.json());

app.use('/lists', cors(), authMiddleware.authenticate, authMiddleware.checkAdminRole, listRouter);
app.use('/admin', cors(), authMiddleware.authenticate, authMiddleware.checkAdminRole, adminRouter)
app.use('/users', cors(), userRouter);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})