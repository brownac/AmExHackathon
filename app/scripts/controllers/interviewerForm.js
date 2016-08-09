'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope,$routeParams, $timeout, candidateService) {
  $scope.questions = [
    {id: 1, question: 'This is a sample question'},
    {id: 2, question: 'This is another sample question'},
    {id: 3, question: 'This is a line that is hopefully longer than twenty characters.'}
  ];

  $scope.getAnsBoxSize = function(question) {
    var lineSize = 20;
    var res = 3;
    if(question.length > lineSize) {
      res += question.length / lineSize;
    }
    return res;
  };
});
