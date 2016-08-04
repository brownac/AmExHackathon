var models  = require('../models');
var express = require('express');
var router  = express.Router();

// Insert a candidate
router.post('/', function(req, res) {
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
  candidate.save().then(() => {
    res.json(candidate);
  });
});

// Get all candidates
router.get('/', function(req, res) {
  models.candidateInfo.findAll({})
  .then(function(result) {
    res.json(result);
  });
});

// Get candidate by id
router.get('/:id', function(req, res) {
  var id = req.params.id;

  models.candidateInfo.findById(id).then(function(result) {
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
