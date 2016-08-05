'use strict'
var express = require('express');
var expressLogging = require('express-logging');
var logger = require('logops');
var models = require("./models");
var bodyParser = require('body-parser');

var path = require('path');
var process = require('process');

var routes = require('./routes/index');


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// mount middlewares
let dev = false;
if (process.argv[2] === 'dev') {
  dev = true;
  console.log("Running in development mode");
}

/** Middlewares */
// logging
app.use(expressLogging(logger));

// static assets
// for angular app and bower deps if development mode
if (dev) {
  app.use(express.static(path.join(__dirname, '../app')));
  app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
}
// otherwise (production) just use ../dist as the static directory
else {
  app.use(express.static(path.join(__dirname, '../dist')));
}

/** Other routes and controllers */
// mount the controllers router
app.use('/api', routes);

//sync the models with the data, will creat the schems if not present
//starts the server
let port = 4500;
models.sequelize.sync({force:true}).then(function () {
  var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
});
