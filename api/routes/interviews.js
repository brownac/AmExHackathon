'use strict';
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');
var email = require('../email');

const appDir = path.join(__dirname, '../../app');

router.post('/', function(req, res) {
	console.log('Inserting an interview');
});

// Update a candidate by id
router.put('/', function(req, res) {
	models.Interviews.update({
		interview_Date: req.body.Interview.Interview_Date,
		interview_Time: req.body.Interview.Interview_Time,
		interview_Location: req.body.Interview.Interview_Location,
		interviewer_1: req.body.Interview.Interviewer_1,
		interviewer_2: req.body.Interview.Interviewer_2,
		interview_FT_Link:req.body.Interview.Interview_FT_Link,
		interview_Int_Link:req.body.Interview.Interview_Int_Link
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
				}
				email( req.body.email,req.body.firstName,req.body.lastName,req.body.Interview.Interview_Date,
				req.body.Interview.Interview_Time,req.body.Interview.Interview_Location,req.body.Interview_FT_link,
				req.body.Interview.Interview_Int_Link,edit);
			}
	}, function(rejectedPromiseError){
    	res.status(404).json({
      	errors: [
        	"Could not find candidate with id " + id
      	]
    	});
    	res.send('Success');
	}, function(rejectedPromiseError){
	    res.status(404).json({
	      	errors: [
	        	'Could not find candidate with id ' + id
	      	]
	    });
	});
});

// Get all interviews
router.get('/', function(req, res) {
	var query = {};
	var interviewQuery = {};
	if(req.query.interviewQuery !== undefined) {
		var interviewQuery = JSON.parse(req.query.interviewQuery);
	}
	if(req.query.sequelize !== undefined) {
		query = JSON.parse(req.query.sequelize);
	}
	var sql = {
				include: [{
					model: models.Interviews,
					where: interviewQuery,
					required: true
				}],
				where: query
			};
	models.Candidates.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

module.exports = router;
