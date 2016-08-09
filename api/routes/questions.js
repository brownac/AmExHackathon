'use strict'

var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

const appDir = path.join(__dirname, '../../app');

// Insert an interview form
router.post('/', function(req, res) {
	// create an instance
	var intQuest = models.questions.build({
		form_type: req.body.form_type,
		version: req.body.version,
		page_1: req.body.page_1,
		page_2: req.body.page_2,
		page_3: req.body.page_3,
		page_4: req.body.page_4,
		page_5: req.body.page_5,
		active: req.body.active
	});

	// persist an instance
  intQuest.save().then(() => {
    // a slash goes before this in the database uri
    const imgRelativePath = `uploads/${intQuest.id}.resume.png`;
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
        var image_table = models.Images.build({
          id: intQuest.id,

          // add the preceding forwardslash
          img_uri: '/' + imgRelativePath,
          type: image_type
        });
        image_table.save();

        res.json(intQuest);
      }
    });
  });
});

// Update a question by id
router.put('/', function(req, res) {
	models.questions.update({
		form_type: req.body.form_type,
		version: req.body.version,
		page_1: req.body.page_1,
		page_2: req.body.page_2,
		page_3: req.body.page_3,
		page_4: req.body.page_4,
		page_5: req.body.page_5,
		active: req.body.active
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

// Get all question
router.get('/', function(req, res) {
	var query = req.query;
	var sql = {
				include: [{
					model: models.Candidates
				}],
				where:
				   query
			  };
	models.questions.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

// Get question by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.questions.findById(id, {
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
					"Could not find question with id " + id
				]
			});
		}
	});
});

module.exports = router;
