const development = require('./env/development');
const production = require('./env/production');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const defaults = {
    port: normalizePort(process.env.PORT || '3302'),
};

module.exports = {
    development: Object.assign({}, development, defaults),
    production: Object.assign({}, production, defaults)
}[process.env.NODE_ENV || 'development'];
