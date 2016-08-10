'use strict'

var models  = require('../models');
var utils  = require('../utils');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

// Insert a question
router.post('/', function(req, res) {
	console.log("Posting: " + req);
	// create an instance
	var question = models.Questions.build({
		form_type:req.body.form_type,
		version:req.body.version,
		page_1:req.body.page_1,
		page_2:req.body.page_2,
		page_3:req.body.page_3,
		page_4:req.body.page_4,
		page_5:req.body.page_5
	});

	// persist an instance
  question.save().then(() => {
    const imageName = `${question.id}.question_________(ADD QUESTION NUMBER).png`;
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
        var image_type = 'question';
        var image = models.Images.build({
          id: question.id,

          // add the preceding forwardslash
          img_uri: imgUri,
          type: image_type
        });
        image.save();

        res.json(question);
      }
    });
  });
});

// Update a question by id
router.put('/', function(req, res) {
	models.Questions.update({
		form_type:req.body.form_type,
		version:req.body.version,
		page_1:req.body.page_1,
		page_2:req.body.page_2,
		page_3:req.body.page_3,
		page_4:req.body.page_4,
		page_5:req.body.page_5
	},
	{
		where: { id : req.body.id }
	})
	.then(function(result) {
    res.send("Success");
	}, function(rejectedPromiseError){
    res.status(404).json({
      errors: [
        "Could not find question with id " + id
      ]
    });
	});
});

// Get all questions
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
	models.Questions.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

// Get question by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.Questions.findById(id, {
		include: [{
			model: models.Images,
			required: true
		}]
	}).then(function(result) {
		if (result !== null) {
			res.json(result);
		}
		else {
			res.status(404).json({
				errors: [
					"Could not find question with id " + id
				]
			});
		}
	});
});

module.exports = router;
