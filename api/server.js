'use strict'
var express = require('express');
var morgan = require('morgan');
var models = require("./models");
var bodyParser = require('body-parser');

var utils = require('./utils');
var routes = require('./routes/index');


var app = express();

/** Middlewares */
// logging
app.use(morgan('dev'));

// request parsing
app.use(bodyParser.json({ limit: "30mb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// uploads directory
app.use('/uploads', express.static(utils.uploadsDir));

// for angular app and bower deps if development mode
if (utils.dev) {
  app.use(express.static(utils.angularAppDir));
  app.use('/bower_components', express.static(utils.bowerDir));
}
// otherwise (production) just use ../dist as the static directory
else {
  app.use(express.static(utils.distDir));
}

/** Other routes and controllers */
// mount the controllers router
app.use('/api', routes);

//sync the models with the data, will creat the schemas if not present
//starts the server
let port = 4500;
models.sequelize.sync().then(function () {
  var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
  });
});
