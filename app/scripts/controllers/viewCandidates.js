'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:ViewCandidatesCtrl
 * @description
 * # ViewCandidatesCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('ViewCandidatesCtrl', function ($scope, $q, candidateService) {
      $scope.init = function() {
        candidateService.query().$promise.then(values => {
          $scope.candidates = values;

          if($scope.candidates.length) {
            $scope.candidateStatus = 'Choose a candidate from the sidebar';
          }
          else {
            $scope.candidateStatus = 'No candidates in database';
          }
        });
      };

      $scope.init();
  });
