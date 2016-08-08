'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CandidateFormCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, softpenImage) {
    if($routeParams.candidateId) {
      // Get the candidate id from the url
      var candidateId = $routeParams.candidateId;
      candidateService.get({ id: candidateId }).$promise.then(value => {
        $scope.postCandidate = value;
      });
    }

    const init = function() {
      $scope.postCandidate = {};
      $scope.pictureAdded = false;

      if (softpenImage.src !== null) {
        $scope.pictureAdded = true;
        $scope.postCandidate.resumeBase64 = softpenImage.src;
      }

      $scope.buttonText = "Submit";
      $scope.submitBtnClasses = "btn btn-primary";

      // this goes true while the file is uploading
      $scope.sendingData = false;
    };

    $scope.readImage = function(event) {
      var files = event.target.files;

      if (files && files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function() {
            $scope.postCandidate.resumeBase64 = e.target.result;
            $scope.pictureAdded = true;
          });
        };
        reader.readAsDataURL(files[0]);
      }
    };

    $scope.submit = function() {
      $scope.sendingData = true;

      if($routeParams.candidateId) {
        $scope.postCandidate.$update().then(values => {
          // show success by changing submit button class and value
          $scope.buttonText = "Successfully Submitted";
          $scope.submitBtnClasses = "btn btn-success";

          $timeout(() => {
            $location.path('viewCandidate/' + $routeParams.candidateId);
          }, 1500);
        });
      }
      else {
        candidateService.save($scope.postCandidate).$promise.then(values => {
          // show success by changing submit button class and value
          $scope.postCandidate = {};
          $scope.sendingData = false;
          $scope.buttonText = "Successfully Submitted";
          $scope.submitBtnClasses = "btn btn-success";

          $timeout(() => {
            // re-initialize the scope
            init();
          }, 1000);
        });
      }
    }

    init();
  });
