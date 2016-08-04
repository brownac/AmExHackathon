'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CandidateFormCtrl', function ($scope, $q, $timeout, candidateService) {
    const init = function() {
      $scope.pictureAdded = false;
      $scope.buttonText = "Submit";
      $scope.submitBtnClasses = "btn btn-primary";
    };

    $scope.submit = function() {
      candidateService.save($scope.postCandidate).$promise.then(values => {
        // show success by changing submit button class and value
        $scope.postCandidate = {};
        $scope.buttonText = "Successfully Submitted";
        $scope.submitBtnClasses = "btn btn-success";

        $timeout(() => {
          // re-initialize the scope
          init();
        }, 1500);
      });
    }

    init();
  });
