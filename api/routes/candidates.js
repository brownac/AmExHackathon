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
	var candidate = models.Candidates.build({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		school: req.body.school,
		major: req.body.major,
		graduationDate: req.body.graduationDate,
		needSponsorship: req.body.needSponsorship,
		internOrFull: req.body.internOrFull,
		areaOfInterest: req.body.areaOfInterest.join(', '),
		preferredLanguages: req.body.preferredLanguages.join(', '),
		finalEvaluation: req.body.finalEvaluation,
		notes: req.body.notes,
		screenerInitials: req.body.screenerInitials
	});

	// persist an instance
	candidate.save().then(() => {
	    const imageName = `${candidate.id}.resume.png`;
	    const imgUri = `/uploads/${imageName}`;
	    const imgAbsPath = path.join(utils.uploadsDir, imageName);

	    let base64Png = req.body.resumeBase64.split(',')[1];

	    fs.writeFile(imgAbsPath, base64Png, {encoding: 'base64'} , err => {
	      if (err) {
	        res.status(500).json({
	          errors: [
	            "Could not save image to disk! Node.js threw an error",
	            err
	          ]
	        });
	      }
	      else {
	        //save image uri into database
	        var image_type = 'resume';
	        var image = models.Images.build({
	          can_id: candidate.id,

	          // add the preceding forwardslash
	          img_uri: imgUri,
	          type: image_type
	        });
	        image.save();

	        //creates an interview spot for the candidate
	        var interview = models.Interviews.build({
	        	can_id: candidate.id
	        });
			interview.save();
		  }
		});

	    if (req.body.puzzleBase64 !== undefined) {
		    const puzzleName = `${candidate.id}.puzzle.png`;
		    const puzzleUri = `/uploads/${puzzleName}`;
		    const puzzleAbsPath = path.join(utils.uploadsDir, puzzleName);

				let puzzleBase64Png = req.body.puzzleBase64.split(',')[1];
		    fs.writeFile(puzzleAbsPath, puzzleBase64Png, {encoding: 'base64'} , err => {
			    if (err) {
			        res.status(500).json({
				        errors: [
				          "Could not save image to disk! Node.js threw an error",
				          err
				        ]
			        });
			    }
			    else {
			        //save image uri into database
			      	var image_type = 'puzzle';
				    var image = models.Images.build({
				      can_id: candidate.id,
				      img_uri: puzzleUri,
				      type: image_type
				    });
			        image.save();
			    }
		    });
		}
		res.json(candidate);
	});
});


// Update a candidate by id
router.put('/', function(req, res) {
	models.Candidates.update({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		school: req.body.school,
		major: req.body.major,
		graduationDate: req.body.graduationDate,
		needSponsorship: req.body.needSponsorship,
		internOrFull: req.body.internOrFull,
		areaOfInterest: req.body.areaOfInterest.join(', '),
		preferredLanguages: req.body.preferredLanguages.join(', '),
		finalEvaluation: req.body.finalEvaluation,
		notes: req.body.notes,
		screenerInitials: req.body.screenerInitials
	},
	{
		where: { id : req.body.id }
	})
	.then(function(result) {
    res.send("Success");
	}, function(rejectedPromiseError){
    res.status(404).json({
      errors: [
        "Could not find candidate with id " + req.body.id + " " + rejectedPromiseError
      ]
    });
	});
});

// Get all candidates
router.get('/', function(req, res) {
	var query = {};
	if(req.query.sequelize !== undefined) {
		query = JSON.parse(req.query.sequelize);
	}

	var sql = {
				include: [{
					model: models.Images,
					required: true
					}],
				where: query
			  };
	models.Candidates.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

// Get candidate by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.Candidates.findById(id, {
		include: [{
			model: models.Images,
			required: true
		}, {
			model: models.Interviews,
			required: false
		}]
	}).then(function(result) {
		if (result !== null) {
			res.json(result);
		}
		else {
			res.status(404).json({
				errors: [
					"Could not find candidate with id " + id
				]
			});
		}
	});
});

module.exports = router;
