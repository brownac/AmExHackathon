"use strict";

module.exports = function(sequelize, DataTypes) {
  var test = sequelize.define("test", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    data: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });

  return test;
};