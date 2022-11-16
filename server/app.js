const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config/config');
const router = require('./routes/index');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connect();

if (process.env.NODE_ENV === 'development') {
    // webpack-dev-server config
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.dev');
    const compiler = webpack(config);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: '/',
        })
    );
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(path.resolve(__dirname, '../build')));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// const ENV = process.env.NODE_ENV;
// if (ENV !== 'production') {
//     app.use(logger('dev'));
// } else {
//     const logFileName = path.join(__dirname, 'logs', 'access.log')
//     const writeStream = fs.createWriteStream(logFileName, {
//         flags: 'a'
//     })
//     app.use(logger('combined', {
//         stream: writeStream
//     }));
// }

// Routers
router(app);

function connect() {
    mongoose.connection
        .on('error', (error) => {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        })
        .on('disconnected', connect)
        .once('open', () => {
            console.log('连接数据库成功');
        });
    return mongoose.connect(config.dbUrl, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
