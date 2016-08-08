"use strict";

module.exports = function(sequelize, DataTypes) {
  var interviewQuestions = sequelize.define("interviewQuestions", {
    form_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    form_type: {
      type: DataTypes.STRING
    },
    version: {
      type: DataTypes.STRING
    },
    page_1: {
      type: DataTypes.STRING
    },
    page_2: {
      type: DataTypes.STRING
    },
    page_3: {
      type: DataTypes.STRING
    },
    page_4: {
      type: DataTypes.STRING
    },
    page_5: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false,
    /*classMethods: {
      associate: function(models) {
        candidateInfo.hasMany(models.image_uri,{
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }*/
  });
  return interviewQuestions;
};
