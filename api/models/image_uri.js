"use strict";

module.exports = function(sequelize, DataTypes) {
  var image_uri = sequelize.define("image_uri", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    img_uri: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        image_uri.belongsTo(models.candidateInfo, {
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }
  });
  return image_uri;
};