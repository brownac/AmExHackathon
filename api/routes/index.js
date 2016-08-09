var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateRoutes = require('./candidates');
var interviewRoutes = require('./interviews');

router.use('/candidates', candidateRoutes);
router.use('/interviews', interviewRoutes);

module.exports = router;