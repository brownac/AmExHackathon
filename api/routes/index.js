var models  = require('../models');
var express = require('express');
var Sequelize = require('sequelize');
var router  = express.Router();

var sequelize = new Sequelize('main', 'user', 'password', {
  dialect: 'sqlite',
  storage: 'db.development.sqlite'
});

router.post('/insert', function(req, res) {
  // create an instance
  var candidate = models.candidateInfo.build({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    graduationDate: req.body.graduationDate,
    needSponsorship: req.body.needSponsorship,
    internOrFull: req.body.internOrFull,
    areaOfInterest: req.body.areaOfInterest,
    preferredLanguages: req.body.preferredLanguages,
    finalEvaluation: req.body.finalEvaluation
  })
  // persist an instance
  candidate.save();
});

router.get('/getCandidateInfo', function(req, res) {
  models.candidateInfo.findAll({})
  .then(function(result) {
    res.send(result);
  });
});

module.exports = router;
