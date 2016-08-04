'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('ViewCandidateCtrl', function ($scope, $q, $routeParams, $timeout, viewCandidateService) {
      var candidateId = $routeParams.candidateId;

      $scope.init = function() {
        $q.all([viewCandidateService.getCandidateById(candidateId)]).then(values => {
            $scope.candidate = values[0];
        });

        $q.all([viewCandidateService.getCandidates()]).then(values => {
            $scope.candidates = values[0];
        });
      };

      $scope.init();
  });

angular.module('amExHackathonApp')
  .service('viewCandidateService', ['$http', '$q', function($http, $q) {
    // Return public API
    return ({
      getCandidates: getCandidates,
      getCandidateById: getCandidateById
    });

    // get from db
    function getCandidates() {
      var request = $http({
          method: "get",
          url: "http://localhost:4500/api/getCandidateInfo"
      });
      return (request.then(handleSuccess, handleError));
    }

    // update record in db
    function getCandidateById(id) {
      var request = $http({
          method: "get",
          url: "http://localhost:4500/api/getCandidateInfo/" + id
      });
      return (request.then(handleSuccess, handleError));
    }

    // Transform the error response, unwrapping the
    // application data from the API response payload.
    function handleError(response) {
      // If request was not handled by the server
      // (or not handled properly eg. server error),
      // then normalize it on our end
      if (!angular.isObject(response.data) || !response.data.message) {
          return ($q.reject("An unknown error occurred."));
      }

      // Otherwise, use expected error message.
      return ($q.reject(response.data.message));
    }

    // Transform the successful response, unwrapping the
    // application data from the API response payload
    function handleSuccess(response) {
      return response.data;
    }
}]);
