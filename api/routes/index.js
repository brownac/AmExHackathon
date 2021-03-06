var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateRoutes = require('./candidates');
var interviewRoutes = require('./interviews');
var questionsRoutes = require('./questions');
var archivesRoutes = require('./archives');
var interviewersRoutes = require('./interviewers');

router.use('/candidates', candidateRoutes);
router.use('/interviews', interviewRoutes);
router.use('/questions', questionsRoutes);
router.use('/archives', archivesRoutes);
router.use('/interviewers', interviewersRoutes);

module.exports = router;
