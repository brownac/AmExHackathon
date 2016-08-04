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
        });
      };

    $scope.statusIconClass = function(status){
      if(status === "invite")
            return "glyphicon glyphicon-ok green"
      else if(status === "turndown")
         return "glyphicon glyphicon-remove red";
      else
         return "glyphicon glyphicon-minus yellow";
    }

      $scope.init();
  });
