'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope) {
    $scope.events = [];
    $scope.calendarView = 'month';
    var calDate = new Date();
    $scope.calendarDate = calDate;
    $scope.calendarTitle = calDate.getMonth() + " " + calDate.getFullYear();

    $scope.events.push({
        title:"JUSTIN MACEDO",
        startsAt: new Date(),
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        }
      });
    $scope.changeView = function(newView){
      $scope.calendarView = newView;
    };
  
});
