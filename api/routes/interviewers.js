'use strict';

var models  = require('../models');
var utils  = require('../utils');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

// Insert a candidate
router.post('/', function(req, res) {
	// create an instance
	var interviewer = models.Interviewers.build({
		name: req.body.name
	});

	// persist an instance
	interviewer.save().then(() => {
        res.json(interviewer);
    });
});

// Get all interviewers
router.get('/', function(req, res) {
	console.log('Made it');
	models.Interviewers.findAll()
	.then(function(result) {
		res.json(result);
	});
});

router.delete('/:id', function (req, res) {
	models.Interviewers.destroy({
		where: {
			id: req.params.id
		}
	});
});

module.exports = router;