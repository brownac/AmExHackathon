'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CandidateFormCtrl
 * @description
 * # CandidateFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('ViewCandidatesCtrl', function ($scope, $q, candidateService) {
      $scope.init = function() {
        candidateService.query().$promise.then(values => {
            $scope.candidates = values[0];
        });
      };

      $scope.init();
  });

angular.module('amExHackathonApp')
  .service('viewCandidatesService', function($http, $q) {
    // Return public API
    return ({
      getCandidates: getCandidates
    });

    // get from db
    function getCandidates() {
      var request = $http({
          method: "get",
          url: "http://localhost:4500/api/getCandidateInfo"
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
  });
