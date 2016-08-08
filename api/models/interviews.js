"use strict";

module.exports = function(sequelize, DataTypes) {
  var Interviews = sequelize.define("Interviews", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
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
    interviewer_Name: {
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