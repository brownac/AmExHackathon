"use strict";

module.exports = function(sequelize, DataTypes) {
  var Archives = sequelize.define("Archives", {
    id: {
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
        Archives.hasMany(models.Images,{
          foreignKey: 'id',
          targetKey: 'id'
        }),
        Archives.hasOne(models.Candidates,{
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }
  });
  return Archives;
};
