var express = require('express');
var mongoose = require('mongoose');
var expressLogging = require('express-logging');
var logger = require('logops');

var controllers = require('./controllers');
var middleware = require('./middleware');

var app = express();

// mount middlewares
app.use(expressLogging(logger));
app.use(middleware.emberHeadersMiddleware);

// mount the controllers router
app.use('/api', controllers);

let port = 4500;
app.listen(port, () => {
  console.log("Express server running on port " + port);
});
