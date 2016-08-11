angular.module('amExHackathonApp')
  .controller('ScreenerSplashCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, candidateToScreenerService, softpenImage) {

    $scope.candidateToPass = candidateToScreenerService.get();
    candidateToScreenerService.set($scope.candidateToPass);

    $scope.goToScreenerForm = function() {
      $location.path('/screener/candidateForm');
    }

  });
