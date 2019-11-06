"use strict";

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var http = require('http');

/**
 * Simple logger function.
 */
function log(message) {
  process.stdout.write("".concat(message, "\n"));
}
/**
 * Normalize a port into a number, string, or false.
 */


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || 8080);

_app["default"].set('port', port);
/**
 * Create HTTP server.
 */


var server = http.createServer(_app["default"]);
var availablePort = port;
/**
 * Listen on provided port, on all network interfaces.
 */

function startServer(serverPort) {
  server.listen(serverPort);
}
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = "".concat(typeof port === 'string' ? 'Pipe' : 'Port', " ").concat(port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      log("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      if (availablePort - port < 10) {
        availablePort += 1;
        startServer(availablePort);
      } else {
        log("".concat(bind, " is already in use"));
        process.exit(1);
      }

      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  var addr = server.address();
  var bind = "".concat(typeof addr === 'string' ? 'pipe' : 'port', " ").concat(typeof addr === 'string' ? addr : addr.port);
  log("Server is listening on ".concat(bind));
  log("Visit: http://localhost:".concat(addr.port));
}
/**
 * Start server.
 */


server.on('error', onError);
server.on('listening', onListening);
startServer(availablePort);