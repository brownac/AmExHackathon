'use strict';

module.exports = function(sequelize, DataTypes) {
  var Interviews = sequelize.define('Interviews', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    interview_Date: {
      type: DataTypes.DATE
    },
    interview_Time: {
      type: DataTypes.STRING
    },
    interview_Location: {
      type: DataTypes.STRING
    },
    interviewer_1: {
      type: DataTypes.STRING
    },
    interviewer_2: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Interviews.belongsTo(models.Candidates,{
          foreignkey: 'id',
          targetkey: 'id'
        });
      }
    }
  });

  return Interviews;
};
