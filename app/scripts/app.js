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
    'ngTouch',
    'mwl.calendar'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'Home'
      })
      .when('/screener/softpen', {
        templateUrl: 'views/softpen.html',
        controller: 'SoftPenCtrl',
        controllerAs: 'softpen'
      })
      .when('/screener/candidateInput', {
        templateUrl: 'views/candidateInput.html',
        controller: 'CandidateInputCtrl',
        controllerAs: 'candidateInput'
      })
      .when('/screener/puzzle', {
        templateUrl: 'views/puzzleCanvas.html',
        controller: 'PuzzleCtrl',
        controllerAs: 'puzzle'
      })
      .when('/screener/screenerSplash', {
        templateUrl: 'views/screenerSplash.html',
        controller: 'ScreenerSplashCtrl',
        controllerAs: 'screenerSplash'
      })
      .when('/screener/candidateForm', {
        templateUrl: 'views/candidateForm.html',
        controller: 'CandidateFormCtrl',
        controllerAs: 'candidateForm'
      })
      .when('/screener/candidateForm/:candidateId', {
        templateUrl: 'views/candidateForm.html',
        controller: 'CandidateFormCtrl',
        controllerAs: 'candidateForm'
      })
      .when('/recruiter/recruiterForm', {
        templateUrl: 'views/recruiterForm.html',
        controller: 'RecruiterFormCtrl',
        controllerAs: 'recruiterForm'
      })
      .when('/recruiter/recruiterHome', {
        templateUrl: 'views/recruiterHome.html',
        controller: 'RecruiterHomeCtrl',
        controllerAs: 'recruiterHome'
      })
      .when('/interviewer/interviews', {
        templateUrl: 'views/interviews.html',
        controller: 'InterviewsCtrl',
        controllerAs: 'Interviews'
      })
      .when('/interviewer/:candidateId', {
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
      .when('/admin/adminOptions', {
        templateUrl: 'views/adminOptions.html',
        controller: 'adminOptionsCtrl',
        controllerAs: 'adminOps'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
