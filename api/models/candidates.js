'use strict';

module.exports = function(sequelize, DataTypes) {
  var Candidates = sequelize.define('Candidates', {
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
      type: DataTypes.DATE
    },
    needSponsorship: {
      type: DataTypes.BOOLEAN
    },
    internOrFull: {
      type: DataTypes.STRING
    },
    areaOfInterest: {
      type: DataTypes.TEXT
    },
    preferredLanguages: {
      type: DataTypes.TEXT
    },
    finalEvaluation: {
      type: DataTypes.STRING
    },
    screenerInitials: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Candidates.hasMany(models.Images,{
          foreignKey: 'id',
          targetKey: 'id'
        }),
        Candidates.hasOne(models.Interviews,{
          foreignKey: 'id',
          targetKey: 'id'
        });
      }
    }
  });
  return Candidates;
};
