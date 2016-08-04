var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateInfoRoutes = require('./candidateInfo');

router.use('/candidateInfo', candidateInfoRoutes);

module.exports = router;
