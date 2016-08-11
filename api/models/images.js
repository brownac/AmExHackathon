'use strict';

module.exports = function(sequelize, DataTypes) {
  var Images = sequelize.define('Images', {
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true
    },
    can_id: {
      type:DataTypes.INTEGER,
    },
    que_id: {
      type:DataTypes.INTEGER,
    },
    arc_id: {
      type:DataTypes.INTEGER,
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
          foreignKey: 'id'
         }),
         Images.belongsTo(models.Archives, {
           foreignKey: 'id'
         }),
         Images.belongsTo(models.Questions, {
           foreignKey: 'id'
         });
      }
    }
  });
  return Images;
};