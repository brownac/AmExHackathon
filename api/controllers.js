const express = require('express');

var models = require('./models');

let router = express.Router();

router.get('/',function(req,res) {
	res.send('Working');
});

router.get('/notes', function(req,res) {
	models.Note.find({},function(err,docs) {
		if(err) {
			res.send({error:err});
		}
		else {
			res.send({notes:docs});
		}
	});
});

module.exports = router;
