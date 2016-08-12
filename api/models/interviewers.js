'use strict';

module.exports = function(sequelize, DataTypes) {
  var Interviewers = sequelize.define('Interviewers', {
    name: DataTypes.STRING
  });
  return Interviewers;
};