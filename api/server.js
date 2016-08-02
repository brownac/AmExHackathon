'use strict'
var express = require('express');
var expressLogging = require('express-logging');
var logger = require('logops');
var models = require("./models");

var routes = require('./routes/index');

//var controllers = require('./controllers');
//var middleware = require('./middleware');

var app = express();

// mount middlewares
app.use(expressLogging(logger));
//app.use(middleware.emberHeadersMiddleware);

// mount the controllers router
//app.use('/api', controllers);
app.use('/', routes);

// let port = 4500;
// app.listen(port, () => {
//   console.log("Express server running on port " + port);
// });

//sync the models with the data, will creat the schems if not present
//starts the server
let port = 4500;
models.sequelize.sync().then(function () {
  var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
});
