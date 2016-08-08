var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateInfoRoutes = require('./candidates');
var calendarInfoRoutes = require('./calendarInfo');

router.use('/candidates', candidateInfoRoutes);
router.use('/calendarInfo', calendarInfoRoutes);

module.exports = router;