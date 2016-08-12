'use strict'

var models  = require('../models');
var utils  = require('../utils');
var express = require('express');
var router  = express.Router();
var fs = require('fs');
var path = require('path');

// Insert an image into the archive
router.post('/', function(req, res) {
	console.log("Posting: " + req);
	// create an instance
	var archive = models.Archives.build({
		form: req.body.form,
		round: req.body.round
	});

	// persist an instance
  archive.save().then(() => {
		console.log("WE ARE IN SAVE FOR ARCHIVES");
  	var i;
  	var archive_id = `${archive.id}`;
  	for(i = 0; i < req.body.files.length; ++i) {
	    const imageName = `${archive.id}.comments_image_` + i + `.png`;
	    const imgUri = `/uploads/${imageName}`;
	    const imgAbsPath = path.join(utils.uploadsDir, imageName);

		if(req.body.files[i] !== undefined) {

				console.log("***** " + req.body.files[i].img_uri);
		    let base64Png = req.body.files[i].split(',')[1];

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
		        var image_type = 'comments';
		        var image = models.Images.build({
		          // add the preceding forwardslash
		          arc_id:archive_id,
		          img_uri: imgUri,
		          type: image_type
		        });
		        image.save();
		      }
		    });
		}
	}
	res.json(archive);
  });
});

// Update an archived image by id
router.put('/', function(req, res) {
	models.Candidates.update({
		form: req.body.form,
		round: req.body.round
	},
	{
		where: { id : req.body.id }
	})
	.then(function(result) {
    res.send("Success");
	}, function(rejectedPromiseError){
    res.status(404).json({
      errors: [
        "Could not find archive with id " + id
      ]
    });
	});
});

// Get all archives
router.get('/', function(req, res) {
	console.log("WE ARE IN GET FOR ARCHIVES");
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
	models.Archives.findAll(sql)
	.then(function(result) {
		res.json(result);
	});
});

// Get archive by id
router.get('/:id', function(req, res) {
	var id = req.params.id;

	models.Archives.findById(id, {
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
					"Could not find archive with id " + id
				]
			});
		}
	});
});

module.exports = router;
