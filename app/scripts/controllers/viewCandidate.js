'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller: ViewCandidateCtrl
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
          var gradDate = new Date($scope.candidate.graduationDate);
          var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          $scope.candidate.graduationDate = monthNames[gradDate.getMonth()] + " " + gradDate.getFullYear();
          $scope.hideResume = true;
          $scope.interviewers = $scope.candidate.Interview.interviewer_1 + ',' +
                                $scope.candidate.Interview.interviewer_2; 
          if ($scope.candidate.Interview.interviewer_1 === null) {
            $scope.interviewers =  'TBD';
          };
        });

        candidateService.query().$promise.then(values => {
          $scope.candidates = values;
        });
      };

      // Handle tab functionality
      $scope.tabs = [{
          title: 'Information',
          url: 'tabInfo.html'
      }, {
          //title: 'Notes',
          //temporary. Just to show image
          title: 'Resume',
          url: 'tabNotes.html'
      }];

      $scope.currentTab = 'tabInfo.html';

      $scope.onClickTab = function (tab) {
          $scope.currentTab = tab.url;
      };

      $scope.isActiveTab = function(tabUrl) {
          return tabUrl === $scope.currentTab;
      };

      // Make the call to init to get the candidate info
      $scope.init();
  });
