'use strict';

/**
 * @ngdoc overview
 * @name amExHackathonApp
 * @description
 * # amExHackathonApp
 *
 * Main module of the application.
 */
angular
  .module('amExHackathonApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/screener/candidateForm', {
        templateUrl: 'views/candidateForm.html',
        controller: 'CandidateFormCtrl',
        controllerAs: 'candidateForm'
      })
      .when('/recruiter/recruiterForm', {
        templateUrl: 'views/recruiterForm.html',
        controller: 'RecruiterFormCtrl',
        controllerAs: 'recruiterForm'
      })
      .when('/interviewer/interviewerForm', {
        templateUrl: 'views/interviewerForm.html',
        controller: 'InterviewerFormCtrl',
        controllerAs: 'InterviewerForm'
      })
      .when('/viewCandidates', {
        templateUrl: 'views/viewCandidates.html',
        controller: 'ViewCandidatesCtrl',
        controllerAs: 'ViewCandidates'
      })
      .when('/viewCandidate/:candidateId', {
        templateUrl: 'views/viewCandidate.html',
        controller: 'ViewCandidateCtrl',
        controllerAs: 'ViewCandidate'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
