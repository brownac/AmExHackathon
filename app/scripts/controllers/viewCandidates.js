'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('ViewCandidatesCtrl', function ($scope, $q, candidateService) {
      $scope.init = function() {
        candidateService.query().$promise.then(values => {
          $scope.candidates = values;
        });
      };

      $scope.init();
  });
