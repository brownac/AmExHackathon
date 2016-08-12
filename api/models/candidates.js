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
    notes: {
      type: DataTypes.TEXT
    },
    screenerInitials: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Candidates.hasMany(models.Images,{
          foreignKey: 'can_id'
        }),
        Candidates.hasOne(models.Interviews,{
          foreignKey: 'can_id'
        }),
        Candidates.hasMany(models.Questions,{
          foreignKey: 'que_id'
        })
        Candidates.hasMany(models.Archives,{
          foreignKey: 'arc_id'
        });
      }
    }
  });
  return Candidates;
};
