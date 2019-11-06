"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// use dotenv
_dotenv["default"].config({
  silent: true
}); // Express app setup


var app = (0, _express["default"])(); // view engine

app.set('views', _path["default"].join(__dirname, '../views'));
app.set('view engine', 'pug'); // serve static files from 'public'

app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // logger

app.use((0, _morgan["default"])('combined')); // body parser

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // use routes

app.use('/', _routes["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); // error handlers

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
  next();
});
var _default = app;
exports["default"] = _default;