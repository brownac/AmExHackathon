'use strict';


var appli = angular.module('amExHackathonApp');

appli.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        alert('image is loaded');
      });
    }
  };
});


appli.controller('SoftPenCtrl', ['$scope', function($scope) {
  $scope.src = "../images/resume.png";

}]);
