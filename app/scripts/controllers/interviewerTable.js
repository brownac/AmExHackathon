'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterHomeCtrl
 * @description
 * # RecruiterHomeCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerTableCtrl',function ($scope, $location, interviewerService) {
    interviewerService.query().$promise.then(values => {
      $scope.interviewers = values;
    });
    //redirect from "Add Interviewer" button on Recruiter page to Add Interviewer/Table page
    $scope.interviewerLink = function() {
      $location.path('/calendar/interviewerTable');
    };

    $scope.recruiterLink = function() {
      $location.path('/recruiter/recruiterHome');
    };

    $scope.addInterviewer = function() {
      interviewerService.save({name: $scope.name}).$promise.then(values => {
        $scope.interviewers.push (values);
      });
      $scope.name = '';
    };

    $scope.deleteInterviewer = function(index) {
      console.log('Deleting an interviewer');
      var interviewer = $scope.interviewers[index];
      interviewer.$delete({id: interviewer.id});
      $scope.interviewers.splice(index,1);
    };

});
