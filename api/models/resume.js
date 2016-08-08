'use strict';

module.exports = function(sequelize, DataTypes) {
  var resume = sequelize.define("resume", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    img_uri: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });

  return resume;
};
