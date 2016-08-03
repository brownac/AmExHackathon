"use strict";

module.exports = function(sequelize, DataTypes) {
  var candidateInfo = sequelize.define("candidateInfo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    graduationDate: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });

  return candidateInfo;
};
