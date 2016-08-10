'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope, $routeParams, candidateService) {
    $scope.date = new Date();

    // Get the candidate id from the url
    var candidateId = $routeParams.candidateId;
    $scope.candidate = {};

    // Get selected candidate
    $scope.init = function() {
      candidateService.get({ id: candidateId }).$promise.then(value => {
        // Populate Candidate object
        $scope.candidate = value;
        // $scope.candidate.firstName = value.firstName;
        // $scope.candidate.lastName = value.lastName;
        // $scope.candidate.email = value.email;

        console.log("Value: " + value.firstName);
        console.log("Candidate\n" + $scope.candidate.firstName);
      });
    };


    // ----------------------------------------------------------------------
    // Make the call to init to get the candidate info
    $scope.init();
});
