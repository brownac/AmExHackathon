'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CandidateFormCtrl', function ($scope, $q, $timeout, $routeParams, candidateService) {
    if($routeParams.candidateId) {
      // Get the candidate id from the url
      var candidateId = $routeParams.candidateId;
      candidateService.get({ id: candidateId }).$promise.then(value => {
        $scope.postCandidate = value;
      });
    }

    const init = function() {
      $scope.pictureAdded = false;
      $scope.buttonText = "Submit";
      $scope.submitBtnClasses = "btn btn-primary";
    };

    $scope.submit = function() {
      if($routeParams.candidateId) {
        $scope.postCandidate.$update().then(values => {
          // show success by changing submit button class and value
          $scope.buttonText = "Successfully Submitted";
          $scope.submitBtnClasses = "btn btn-success";

          $timeout(() => {
            // re-initialize the scope
            init();
          }, 1500);
        });
      }
      else {
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
    }

    init();
  });
