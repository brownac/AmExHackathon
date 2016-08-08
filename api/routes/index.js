var models  = require('../models');
var express = require('express');
var router  = express.Router();

var candidateRoutes = require('./candidates');

router.use('/candidates', candidateRoutes);

module.exports = router;
