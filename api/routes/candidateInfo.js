'use strict'
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

const appDir = path.join(__dirname, '../../app');

// Insert a candidate
router.post('/', function(req, res) {
	// create an instance
	var candidate = models.candidateInfo.build({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		school: req.body.school,
		major: req.body.major,
		graduationDate: req.body.graduationDate,
		needSponsorship: req.body.needSponsorship,
		internOrFull: req.body.internOrFull,
		areaOfInterest: req.body.areaOfInterest,
		preferredLanguages: req.body.preferredLanguages,
		finalEvaluation: req.body.finalEvaluation
	});

	// persist an instance
  candidate.save().then(() => {

    // a slash goes before this in the database uri
    const imgRelativePath = `uploads/${candidate.id}.resume.png`;
    const imgAbsPath = path.join(appDir, imgRelativePath);

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
        var image_table = models.image_uri.build({
          id: candidate.id,

          // add the preceding forwardslash
          img_uri: '/' + imgRelativePath,
          type: image_type
        });
        image_table.save();

        res.json(candidate);
      }
    });
  });
});

// Update a candidate by id
router.put('/', function(req, res) {
	models.candidateInfo.update({
		firstName: req.body.name,
		lastName: req.body.name,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		school: req.body.school,
		major: req.body.major,
		graduationDate: req.body.graduationDate,
		needSponsorship: req.body.needSponsorship,
		internOrFull: req.body.internOrFull,
		areaOfInterest: req.body.areaOfInterest,
		preferredLanguages: req.body.preferredLanguages,
		finalEvaluation: req.body.finalEvaluation
	},
	{
		where: { id : req.body.id }
	})
	.then(function(result) {
    res.send("Success");
	}, function(rejectedPromiseError){
    res.status(404).json({
      errors: [
        "Could not find candidate with id " + id
      ]
    });
	});
});

// Get all candidates
router.get('/', function(req, res) {
	models.candidateInfo.findAll({include: [ {model: models.image_uri} ]})
	.then(function(result) {
		res.json(result);
	});
});

// Get candidate by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.candidateInfo.findById(id, {include: [ {model: models.image_uri} ]}).then(function(result) {
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
