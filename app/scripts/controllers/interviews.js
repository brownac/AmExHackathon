'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewsCtrl', function ($scope, $routeParams, candidateService) {
    $scope.interviews = [{
      interview_Date: new Date("October 13, 2014 11:13:00"),
      candidate: {firstName: 'Kinderley',
      lastName: 'Charles',
      email: 'kin@yahoo.com'}
    },
    {
      interview_Date: new Date(),
      candidate: {firstName: 'John',
      lastName: 'Doe',
      email: 'kin@yahoo.com'}
    },
    {
      interview_Date: new Date(),
      candidate: {firstName: 'Jane',
      lastName: 'Doe',
      email: 'kin@yahoo.com'}
    }];

    $scope.date = new Date();

});
