'use strict'
var express = require('express');
var expressLogging = require('express-logging');
var logger = require('logops');
var models = require("./models");

var routes = require('./routes/index');

var app = express();

// mount middlewares
app.use(expressLogging(logger));

// mount the controllers router
app.use('/', routes);

//sync the models with the data, will creat the schems if not present
//starts the server
let port = 4500;
models.sequelize.sync().then(function () {
  var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
});
