"use strict";

module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("Questions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    form_name: {
      type: DataTypes.STRING
    },
    form_type: {
      type: DataTypes.STRING
    },
    version: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    form_model: {
      type: DataTypes.CHAR
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Questions.hasMany(models.Images,{
          foreignKey: 'que_id'
        });
      }
    }
  });
  return Questions;
};
