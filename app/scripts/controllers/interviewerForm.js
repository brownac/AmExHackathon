'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope) {
  $scope.questions = [{id: 1, question: 'This is a sample question'},
    {id: 2, question: 'This is another sample question'}];
});
