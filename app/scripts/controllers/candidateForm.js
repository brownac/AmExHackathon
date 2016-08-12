'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CandidateFormCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, candidateToScreenerService, softpenImage, puzzleImage) {
    if($routeParams.candidateId) {
      // Get the candidate id from the url
      var candidateId = $routeParams.candidateId;
      candidateService.get({ id: candidateId }).$promise.then(value => {
        $scope.postCandidate = value;
        $scope.postCandidate.graduationDate = new Date($scope.postCandidate.graduationDate);
        $scope.postCandidate.areaOfInterest = $scope.postCandidate.areaOfInterest.split(", ");
        $scope.postCandidate.preferredLanguages = $scope.postCandidate.preferredLanguages.split(", ");
      });
    }

    const init = function() {
      $scope.postCandidate = candidateToScreenerService.get();
      $scope.resumeAdded = false;
      $scope.puzzleAdded = false;

      if (softpenImage.src !== null) {
        $scope.resumeAdded = true;
        $scope.postCandidate.resumeBase64 = softpenImage.src;
      }

      if (puzzleImage.src !== null) {
        $scope.puzzleAdded = true;
        $scope.postCandidate.puzzleBase64 = puzzleImage.src;
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
        reader.readAsDatURL(files[0]);
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
          }, 1000);
        });
      }
      else {
        candidateService.save($scope.postCandidate).$promise.then(values => {
          // show success by changing submit button class and value
          $scope.postCandidate = {};
          $scope.pictureAdded = false;
          $scope.sendingData = false;
          $scope.buttonText = "Successfully Submitted";
          $scope.submitBtnClasses = "btn btn-success";

          $timeout(() => {
            // re-direct to softpen
            softpenImage.src = null;
            puzzleImage.src = null;

            $location.path('screener/softpen');
          }, 1000);
        });
      }
    };

    init();
  });
