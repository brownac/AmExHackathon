'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewsCtrl', function ($scope, calendarService) {
    $scope.events = [];
    $scope.calendarView = 'month';
    var calDate = new Date();
    $scope.calendarDate = calDate;
    $scope.calendarTitle = calDate.getMonth() + " " + calDate.getFullYear();

//backend query for scheduled candidates
    var query = {
      sequelize:{
        interview_Date:{
          $not: null
        }
      }
    };
    calendarService.query(query).$promise.then(values => {
      $scope.scheduledCandidates = values;
      for (var i = $scope.scheduledCandidates.length - 1; i >= 0; i--) {
        $scope.events.push({
          title:       $scope.scheduledCandidates[i].lastName + ', ' + 
                        $scope.scheduledCandidates[i].firstName + ': ' +       
                        $scope.scheduledCandidates[i].Interview.interview_Location,
          startsAt:    $scope.scheduledCandidates[i].Interview.interview_Date,
          color: {
            primary: '#e3bc08',
            secondary: '#fdf1ba'
          },
          candidate: $scope.scheduledCandidates[i]
        });
    };
    });

    $scope.changeView = function(newView){
      $scope.calendarView = newView;
    };

});
