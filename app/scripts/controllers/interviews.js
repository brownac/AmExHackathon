'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewsCtrl', function ($scope,$location, calendarService) {
    $scope.events = [];
    $scope.calendarView = 'day';
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
        var endDate = new Date($scope.scheduledCandidates[i].Interview.interview_Date);
        endDate.setHours(endDate.getHours() + 1, endDate.getMinutes());
        console.log(endDate);
        console.log($scope.scheduledCandidates[i].Interview.interview_Date);
        $scope.events.push({
          title:    $scope.scheduledCandidates[i].lastName + ', ' +
                    $scope.scheduledCandidates[i].firstName + ': ' +
                    $scope.scheduledCandidates[i].Interview.interview_Location,
          startsAt: new Date($scope.scheduledCandidates[i].Interview.interview_Date),
          endsAt: endDate,
          color: {
             primary: '#e3bc08',
             secondary: '#fdf1ba'
           },
           candidate: $scope.scheduledCandidates[i]
         });
     };
     });

    $scope.eventClicked = function(calendarEvent){
      console.log(calendarEvent.candidate.id);
      var id = calendarEvent.candidate.id;
      $location.path('/interviewer/'+id);
    }
    $scope.changeView = function(newView){
      $scope.calendarView = newView;
    };

});
