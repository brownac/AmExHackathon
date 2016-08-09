var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateRoutes = require('./candidates');
var interviewRoutes = require('./interviews');
var questionsRoutes = require('./questions');
var archivesRoutes = require('./archives');

router.use('/candidates', candidateInfoRoutes);
router.use('/interviews', interviewRoutes);
router.use('/questions', questionsRoutes);
router.use('/archives', archivesRoutes);

module.exports = router;