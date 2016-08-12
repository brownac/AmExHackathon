'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewsCandidateCtrl
 * @description
 * # InterviewsCandidateCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewsCandidateCtrl', function ($scope, $q, $timeout, $routeParams, $location, candidateService, candidateToScreenerService, questionsService, archiveService) {
    $scope.selCandidate;
    $scope.viewInt = false;
    $scope.viewResume = false;
    $scope.editInt = false;
    $scope.intId = 0;
    $scope.interviewsStatus = [2];
    $scope.techQuestions = [];
    $scope.behavQuestions = [];
    $scope.candidateIForms = [];

    var candidateId = $routeParams.candidateId;
    var init = function() {
      candidateService.get({ id: candidateId }).$promise.then(value => {
        $scope.selCandidate = value;
      });

      questionsService.query().$promise.then(values => {
        // Redirect to add new form if the system does not have interview forms yet
        console.log("QUESTION SERVICE INIT");
        if( (values === undefined) || (values.length === 0) ) {
            $location.path('/admin/adminOptions');
        } else {
          var i;
          for(i = 0; i < values.length; i++) {
            if(values[i].form_type === 'Technical') {
              $scope.techQuestions.push(values[i]);
            } else if(values[i].form_type === 'Behavioral') {
              $scope.behavQuestions.push(values[i]);
            }
          }
        }
      });

      archiveService.query({ id: candidateId }).$promise.then(value => {
        $scope.selCandidate.questions = value;
        if(($scope.selCandidate.questions === undefined) || ($scope.selCandidate.questions.length === 0)) {
          $scope.interviewsStatus[0] = {
            enabled: true,
            locked: false
          };
          $scope.interviewsStatus[1] = {
            enabled: false,
            locked: false
          };
        } else if($scope.selCandidate.questions.length === 1) {
          $scope.interviewsStatus[0] = {
            enabled: true,
            locked: true
          };
          $scope.interviewsStatus[1] = {
            enabled: true,
            locked: false
          };
        } else {
          $scope.interviewsStatus[0] = {
            enabled: true,
            locked: true
          };
          $scope.interviewsStatus[1] = {
            enabled: true,
            locked: true
          };
        }
      });
    };

    $scope.toDate = function(date) {
      return new Date(date);
    };

    $scope.editInterviewIdFunc = function(id) {
      $scope.viewResume = false;
      $scope.viewInt = false;
      $scope.editInt = true;
      $scope.intId = id;
      return true;
    };

    $scope.viewInterviewIdFunc = function(id) {
      $scope.viewResume = false;
      $scope.editInt = false;
      $scope.viewInt = true;
      $scope.intId = id;
      return true;
    };

    $scope.viewResumeFunc = function() {
      $scope.viewInt = false;
      $scope.editInt = false;
      $scope.intId = -1;
      $scope.viewResume = true;
    };

    $scope.setCandidateIForm = function() {
      console.log("setCandidateIForm");
      $scope.candidateIForms[0] = {
        form: $scope.techQ.form_model,
        round: 1,
        files: $scope.techQ.Images
      };
      $scope.candidateIForms[1] = {
        form: $scope.behavQ.form_model,
        round: 1,
        files: $scope.techQ.Images
      };

      $location.path('/interviewer/' + candidateId +'/' + $scope.techQ.id + '/' + $scope.behavQ.id);
    };

    init();
});
