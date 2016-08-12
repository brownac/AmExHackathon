'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateInputCtrl
 * @description
 * # CandidateInputCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CandidateInputCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, candidateToScreenerService, softpenImage) {

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
        reader.readAsDatURL(files[0]);
      }
    };

    $scope.submit = function() {
      $scope.sendingData = true;
      candidateToScreenerService.set($scope.postCandidate)
        // show success by changing submit button class and value
        $scope.postCandidate = {};
        $scope.pictureAdded = false;
        $scope.sendingData = false;
        $scope.buttonText = "Successfully Submitted";
        $scope.submitBtnClasses = "btn btn-success";

        $location.path('screener/screenerSplash');
    };

    init();
  });
