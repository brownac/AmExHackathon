'use strict'
var express = require('express');
var expressLogging = require('express-logging');
var logger = require('logops');

var path = require('path');

var models = require("./models");
var routes = require('./routes/index');


var app = express();

/** Middlewares */
// logging
app.use(expressLogging(logger));

// static assets for angular app and bower deps
app.use(express.static(path.join(__dirname, '../app')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

/** Other routes and controllers */
// mount the controllers router
app.use('/api', routes);

//sync the models with the data, will creat the schems if not present
//starts the server
let port = 4500;
models.sequelize.sync().then(function () {
  var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
});
