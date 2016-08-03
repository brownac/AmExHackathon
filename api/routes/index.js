var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/test', function(req, res) {
  models.test.findAll({})
  .then(function(result) {
    res.send(result);
  });
});

module.exports = router;
