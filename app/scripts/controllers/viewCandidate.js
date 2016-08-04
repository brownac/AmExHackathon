'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('ViewCandidateCtrl', function ($scope, $q, $routeParams, $timeout, candidateService) {
      var candidateId = $routeParams.candidateId;

      $scope.init = function() {
        candidateService.get({ id: candidateId }).$promise.then(value => {
          $scope.candidate = value;
        });

        candidateService.query().$promise.then(values => {
          $scope.candidates = values;
        });
      };

      $scope.init();
  });
