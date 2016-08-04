'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller: iewCandidateCtrl
 * @description
 * # iewCandidateCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')

  .controller('ViewCandidateCtrl', function ($scope, $q, $routeParams, $timeout, candidateService) {
    // Get the candidate id from the url
      var candidateId = $routeParams.candidateId;

      // Populate candidates with a list of all the candidates and candidate with the candidate indicated by the id
      $scope.init = function() {
        candidateService.get({ id: candidateId }).$promise.then(value => {
          $scope.candidate = value;
        });

        candidateService.query().$promise.then(values => {
          $scope.candidates = values;
        });
      };

      // Make the call to init to get the candidate info
      $scope.init();
  });
