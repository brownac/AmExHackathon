"use strict";

// Stores all 
module.exports = function(sequelize, DataTypes) {
  var Archives = sequelize.define("Archives", {
    archive_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    form: {
      type: DataTypes.STRING
    },
    round: {
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
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Candidates.hasMany(models.Archives,{
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }
  });
  return Archives;
};
