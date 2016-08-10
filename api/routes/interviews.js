'use strict'
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');
var email = require('../email');

const appDir = path.join(__dirname, '../../app');

// Update a candidate by id
router.put('/', function(req, res) {
	models.Interviews.update({
		interview_Date: req.body.Interview.Interview_Date,
		interview_Time: req.body.Interview.Interview_Time,
		interview_Location: req.body.Interview.Interview_Location,
		interviewer_Name: req.body.Interview.Interviewer_Name
	}, {
		where: { id : req.body.id }
	})
	.then(function(result) {
    	res.send("Success");
			if (req.body.Interview.interview_Date !== null) {
				var edit = false;
				console.log(req.query);
				if (req.query.editing) {
					edit = true;
				};
				email( req.body.email,req.body.firstName,req.body.lastName,req.body.Interview.Interview_Date,
				req.body.Interview.Interview_Time,req.body.Interview.Interview_Location,edit);
			};
	}, function(rejectedPromiseError){
    	res.status(404).json({
      	errors: [
        	"Could not find candidate with id " + id
      	]
    	});
	});
});

// Get all interviews
router.get('/', function(req, res) {
	var query = {};
	if(req.query.sequelize !== undefined) {
		query = JSON.parse(req.query.sequelize);
	}
	var sql = {
				include: [{
					model: models.Interviews,
					where: query,
					required: true
				}]
			};
	models.Candidates.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

module.exports = router;
