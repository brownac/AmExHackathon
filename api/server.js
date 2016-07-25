var express = require('express');
var mongoose = require('mongoose');
var expressLogging = require('express-logging');
var logger = require('logops');
var models = require('./models');

var app = express();
mongoose.connect('mongodb://localhost/emberData');

app.use(expressLogging(logger));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.get('/api/',function(req,res) {
	res.send('Working');
});

app.get('/api/notes', function(req,res) {
	models.Note.find({},function(err,docs) {
		if(err) {
			res.send({error:err});
		}
		else {
			res.send({notes:docs});
		}
	});
});

let port = 4500;
app.listen(port, () => {
  console.log("Express server running on port " + port);
});
