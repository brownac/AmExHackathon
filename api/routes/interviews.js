'use strict'
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

const appDir = path.join(__dirname, '../../app');

// Insert an interview
router.post('/', function(req, res) {
	// create an instance
	var interview = models.Interviews.build({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    interviewDate: req.body.interviewDate,
    interviewTime: req.body.interviewTime,
    interviewLocation: req.body.location,
    interviewerName: req.body.interviewer
  });
	
	// persist an instance
  interview.save();
});

// Update an interview by id
router.put('/', function(req, res) {
	models.Interviews.update({
	first_name: req.body.firstName,
	last_name: req.body.lastName,
    interviewDate: req.body.interviewDate,
    interviewTime: req.body.interviewTime,
    interviewLocation: req.body.location,
    interviewerName: req.body.interviewer
	},
	{
		where: { id : req.body.id }
	})
	.then(function(result) {
    res.send("Success");
	}, function(rejectedPromiseError){
    res.status(404).json({
      errors: [
        "Could not find interview with id " + id
      ]
    });
	});
});

// Get all interviews
router.get('/', function(req, res) {
	var query = req.query;
	var sql = {
				include: [{
					model: models.Candidates
				}],
				where:
				   query
			  };
	models.Interviews.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

// Get interview by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.Interviews.findById(id, {
		include: [{
			model: models.Candidates
		}]
	}).then(function(result) {
		if (result !== null) {
			res.json(result);
		}
		else {
			res.status(404).json({
				errors: [
					"Could not find interview with id " + id
				]
			});
		}
	});
});

module.exports = router;