'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('SidebarCtrl', function ($scope, candidateService) {
    $scope.property = "firstName";
    $scope.order = "firstName";

    $scope.clear = function() {
      $scope.search = "";
    };

    $scope.statusIconClass = function(status){
      if(status === "invite") {
        return "glyphicon glyphicon-ok green";
      }
      else if(status === "turndown") {
        return "glyphicon glyphicon-remove red";
      }
      else {
        return "glyphicon glyphicon-minus yellow";
      }
    }
    $scope.turndownCandidate = function(candidate){
      console.log('It is the beginning');
      var tempCandidate;
      candidateService.get({ id: candidate.id }).$promise.then(value => {
        tempCandidate = value;
        console.log(tempCandidate);
        tempCandidate.finalEvaluation = 'turndown';
        tempCandidate.areaOfInterest = tempCandidate.areaOfInterest.split(", ");
        tempCandidate.preferredLanguages = tempCandidate.preferredLanguages.split(", ");
        tempCandidate.$update().then(values => {
        console.log('Turning down the candidate: ' + candidate.lastName);
        $scope.init();
      }); 
      });     
    }
  });
