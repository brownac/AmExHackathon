var models  = require('../models');
var express = require('express');
var Sequelize = require('sequelize');
var router  = express.Router();

var sequelize = new Sequelize('main', 'user', 'password', {
  dialect: 'sqlite',
  storage: 'db.development.sqlite'
});

router.post('/api/insert', function(req, res) {
    var sql = "INSERT INTO candidateInfos(name,email,major) VALUES('" + req.body.name + "', '" + req.body.email + "', '" + req.body.major + "')";
    sequelize.query(sql).then(d => res.end());
});

router.get('/api/getCandidateInfo', function(req, res) {
  models.candidateInfo.findAll({})
  .then(function(result) {
    res.send(result);
  });
});

module.exports = router;
