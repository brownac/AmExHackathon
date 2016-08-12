'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterHomeCtrl
 * @description
 * # RecruiterHomeCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerTableCtrl',function ($scope, $location) {

    //redirect from "Add Interviewer" button on Recruiter page to Add Interviewer/Table page
    $scope.interviewerLink = function() {
      $location.path('/calendar/interviewerTable');
    };

    $scope.recruiterLink = function() {
      $location.path('/recruiter/recruiterHome');
    };

    $scope.addInterviewer = function() {
      $scope.interviewers.push ({
        firstName: $scope.firstName,
        lastName:  $scope.lastName
      })
    };

    $scope.deleteInterviewer = function(index) {
      console.log(index);
      $scope.interviewers.splice(index,1);
    };

    $scope.interviewers = [];

});
