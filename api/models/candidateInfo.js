"use strict";

module.exports = function(sequelize, DataTypes) {
  var candidateInfo = sequelize.define("candidateInfo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    school: {
      type: DataTypes.STRING
    },
    major: {
      type: DataTypes.STRING
    },
    graduationDate: {
      type: DataTypes.STRING
    },
    needSponsorship: {
      type: DataTypes.STRING
    },
    internOrFull: {
      type: DataTypes.STRING
    },
    areaOfInterest: {
      type: DataTypes.STRING
    },
    preferredLanguages: {
      type: DataTypes.STRING
    },
    finalEvaluation: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        candidateInfo.hasMany(models.image_uri,{
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }
  });
  return candidateInfo;
};
