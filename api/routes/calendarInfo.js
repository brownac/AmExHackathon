var models  = require('../models');
var express = require('express');
var router  = express.Router();

// Insert an interview date
router.post('/', function(req, res) {
  // create an instance
  var interview = models.calendarInfo.build({
    name: req.body.name,
    interviewDate: req.body.interview_Date,
    interviewLocation: req.body.interview_Location,
    interviewerName: req.body.interviewer_Name
  })
  // persist an instance
  interview.save().then(() => {
    res.json(interview);
  });
});

// Get all interviews
router.get('/', function(req, res) {
  models.calendarInfo.findAll({})
  .then(function(result) {
    res.json(result);
  });
});

// Get interview by id
router.get('/:id', function(req, res) {
  var id = req.params.id;

  models.calendarInfo.findById(id).then(function(result) {
    if (result !== null) {
      res.json(result);
    }
    else {
      res.status(404).json({
        errors: [
          "Could not find interview with id " + id
        ]
      });
    }
  });
});

module.exports = router;