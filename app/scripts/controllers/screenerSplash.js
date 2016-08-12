'use strict';

angular.module('amExHackathonApp')
  .controller('ScreenerSplashCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, candidateToScreenerService, softpenImage, puzzleImage) {

    $scope.candidateToPass = candidateToScreenerService.get();
    candidateToScreenerService.set($scope.candidateToPass);

    $scope.goToScreenerForm = function() {
      $location.path('/screener/candidateForm');
    };

    $scope.goToPuzzleCanvas = function() {
      $location.path('/screener/puzzle');
    };

  });
