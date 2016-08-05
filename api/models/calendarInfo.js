"use strict";

module.exports = function(sequelize, DataTypes) {
  var calendarInfo = sequelize.define("calendarInfo", {
    interview_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    interview_Date: {
      type: DataTypes.DATE
    },
    interview_Location: {
      type: DataTypes.STRING
    },
    interviewer_Name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  calendarInfo.belongsTo(candidateInfo);

  return calendarInfo;
};
