"use strict";

module.exports = function(sequelize, DataTypes) {
  var Images = sequelize.define("Images", {
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
        Images.belongsTo(models.Candidates, {
          foreignKey: 'id',
          targetKey: 'id'
         }),
         Images.belongsTo(models.Archives, {
           foreignKey: 'id',
           targetKey: 'id'
         }),
         Images.belongsTo(models.Questions, {
           foreignKey: 'id',
           targetKey: 'id'
         });
      }
    }
  });
  return Images;
};