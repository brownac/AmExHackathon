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
      $scope.postCandidate = {};
      $scope.pictureAdded = false;
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

    init();
  });
