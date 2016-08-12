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
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Archives.hasMany(models.Images,{
          foreignKey: 'arc_id'
        });
      }
    }
  });
  return Archives;
};
