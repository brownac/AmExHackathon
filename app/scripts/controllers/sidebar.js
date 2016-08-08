'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('SidebarCtrl', function ($scope) {
    $scope.property = "firstName";
    
    $scope.clear = function() {
      $scope.search = "";
    }

    $scope.statusIconClass = function(status){
      if(status === "invite") {
        return "glyphicon glyphicon-ok green"
      }
      else if(status === "turndown") {
        return "glyphicon glyphicon-remove red";
      }
      else {
        return "glyphicon glyphicon-minus yellow";
      }
    }
  });
