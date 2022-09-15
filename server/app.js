const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// webpack-dev-server config
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev.js');
const compiler = webpack(config);

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.output.path));

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);
app.use(webpackHotMiddleware(compiler));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render('index');
});

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
const testRouter = require('./routes/test');
app.use('/test', testRouter);

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
